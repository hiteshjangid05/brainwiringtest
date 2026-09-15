/**
 * Vercel Serverless Function for real-time visitor and completion tracking.
 * - Uses Vercel KV / Upstash Redis if configured (KV_REST_API_URL & KV_REST_API_TOKEN)
 * - Otherwise falls back to global Abacus Integer-as-a-Service API (zero configuration needed)
 */

const NAMESPACE = 'brainwiringtest-app-v3';

async function fetchFromAbacus(action: 'hit' | 'get', key: 'visits' | 'completions'): Promise<number> {
  try {
    const url = `https://abacus.jasoncameron.dev/${action}/${NAMESPACE}/${key}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      return typeof data.value === 'number' ? data.value : 0;
    }
  } catch (err) {
    console.error(`Error with Abacus ${action} on ${key}:`, err);
  }
  return 0;
}

export default async function handler(req: any, res: any) {
  // Enable CORS for Vercel preview and custom domains
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const action = req.query?.action || 'get'; // 'visit' | 'complete' | 'get'

  try {
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    // 1. If Vercel KV is configured in project settings
    if (kvUrl && kvToken) {
      if (action === 'visit') {
        await fetch(`${kvUrl}/incr/bw_visits`, {
          headers: { Authorization: `Bearer ${kvToken}` },
        });
      } else if (action === 'complete') {
        await fetch(`${kvUrl}/incr/bw_completions`, {
          headers: { Authorization: `Bearer ${kvToken}` },
        });
      }

      const getRes = await fetch(`${kvUrl}/mget/bw_visits/bw_completions`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      });
      const kvData = await getRes.json();
      const visits = parseInt(kvData.result?.[0] || '0', 10);
      const completions = parseInt(kvData.result?.[1] || '0', 10);

      return res.status(200).json({
        success: true,
        source: 'vercel-kv',
        visits,
        completions,
      });
    }

    // 2. Default Zero-Config Global Storage via Abacus API
    let visits = 0;
    let completions = 0;

    if (action === 'visit') {
      visits = await fetchFromAbacus('hit', 'visits');
      completions = await fetchFromAbacus('get', 'completions');
    } else if (action === 'complete') {
      completions = await fetchFromAbacus('hit', 'completions');
      visits = await fetchFromAbacus('get', 'visits');
    } else {
      // 'get'
      visits = await fetchFromAbacus('get', 'visits');
      completions = await fetchFromAbacus('get', 'completions');
    }

    return res.status(200).json({
      success: true,
      source: 'global-abacus',
      visits,
      completions,
    });
  } catch (error: any) {
    console.error('Analytics handler error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to process analytics',
    });
  }
}
