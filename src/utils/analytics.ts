/**
 * Real-time global analytics utility for Vercel deployment.
 * Initialized from 1 visit and 1 completion as requested.
 * Supports:
 * 1. Vercel Serverless API (/api/analytics) with Vercel KV / Redis support
 * 2. Direct client fallback to Abacus Global Integer Service (CORS enabled, zero-setup)
 * 3. Graceful offline fallback to localStorage
 */

const STORAGE_KEY = 'brain_wiring_analytics_cache_v3';
const SESSION_VISIT_KEY = 'brain_wiring_session_visited_v3';
const GLOBAL_NAMESPACE = 'brainwiringtest-app-v3';

export interface AnalyticsData {
  visits: number;
  completions: number;
  isRealtime?: boolean;
}

// Initialized from 1 visit and 1 completion
const BASELINE_VISITS = 1;
const BASELINE_COMPLETIONS = 1;

/**
 * Gets cached counts from localStorage or default baseline
 */
export function getLocalCachedAnalytics(): AnalyticsData {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          visits: typeof parsed.visits === 'number' ? parsed.visits : BASELINE_VISITS,
          completions: typeof parsed.completions === 'number' ? parsed.completions : BASELINE_COMPLETIONS,
          isRealtime: false,
        };
      }
    }
  } catch {
    // Ignore storage errors
  }

  return {
    visits: BASELINE_VISITS,
    completions: BASELINE_COMPLETIONS,
    isRealtime: false,
  };
}

function saveLocalCache(visits: number, completions: number) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ visits, completions }));
    }
  } catch {
    // Ignore
  }
}

/**
 * Direct call to global Abacus service (fallback if /api/analytics is not available)
 */
async function callAbacus(action: 'hit' | 'get', key: 'visits' | 'completions'): Promise<number | null> {
  try {
    const res = await fetch(`https://abacus.jasoncameron.dev/${action}/${GLOBAL_NAMESPACE}/${key}`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      return typeof json.value === 'number' ? json.value : null;
    }
  } catch {
    // Network or CORS error
  }
  return null;
}

/**
 * Fetches latest real-time counts from Vercel API or global service
 */
export async function fetchLiveAnalytics(): Promise<AnalyticsData> {
  // 1. Try Vercel Serverless Function
  try {
    const res = await fetch('/api/analytics?action=get');
    if (res.ok) {
      const data = await res.json();
      if (data.success && typeof data.visits === 'number' && typeof data.completions === 'number') {
        const visits = BASELINE_VISITS + data.visits;
        const completions = BASELINE_COMPLETIONS + data.completions;
        saveLocalCache(visits, completions);
        return { visits, completions, isRealtime: true };
      }
    }
  } catch {
    // Failed to reach /api/analytics
  }

  // 2. Direct fallback to Global Abacus Service
  try {
    const [rawVisits, rawCompletions] = await Promise.all([
      callAbacus('get', 'visits'),
      callAbacus('get', 'completions'),
    ]);

    if (rawVisits !== null && rawCompletions !== null) {
      const visits = BASELINE_VISITS + rawVisits;
      const completions = BASELINE_COMPLETIONS + rawCompletions;
      saveLocalCache(visits, completions);
      return { visits, completions, isRealtime: true };
    }
  } catch {
    // Fallback
  }

  // 3. Fallback to cached local data
  return getLocalCachedAnalytics();
}

/**
 * Records a real-time visit globally across all web visitors.
 * Guards with sessionStorage to prevent refresh spam while still fetching latest live counts.
 */
export async function recordRealtimeVisit(): Promise<AnalyticsData> {
  let isNewSession = false;

  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      if (!window.sessionStorage.getItem(SESSION_VISIT_KEY)) {
        window.sessionStorage.setItem(SESSION_VISIT_KEY, 'true');
        isNewSession = true;
      }
    }
  } catch {
    // SessionStorage restricted
  }

  // If this session has already been counted, simply fetch current live data
  if (!isNewSession) {
    return await fetchLiveAnalytics();
  }

  // 1. Try Vercel Serverless Function with action=visit
  try {
    const res = await fetch('/api/analytics?action=visit');
    if (res.ok) {
      const data = await res.json();
      if (data.success && typeof data.visits === 'number' && typeof data.completions === 'number') {
        const visits = BASELINE_VISITS + data.visits;
        const completions = BASELINE_COMPLETIONS + data.completions;
        saveLocalCache(visits, completions);
        return { visits, completions, isRealtime: true };
      }
    }
  } catch {
    // Fallback
  }

  // 2. Direct fallback to Global Abacus Service
  try {
    const [rawVisits, rawCompletions] = await Promise.all([
      callAbacus('hit', 'visits'),
      callAbacus('get', 'completions'),
    ]);

    if (rawVisits !== null && rawCompletions !== null) {
      const visits = BASELINE_VISITS + rawVisits;
      const completions = BASELINE_COMPLETIONS + rawCompletions;
      saveLocalCache(visits, completions);
      return { visits, completions, isRealtime: true };
    }
  } catch {
    // Fallback
  }

  // 3. Offline fallback
  const cached = getLocalCachedAnalytics();
  const updated = {
    visits: cached.visits + 1,
    completions: cached.completions,
    isRealtime: false,
  };
  saveLocalCache(updated.visits, updated.completions);
  return updated;
}

/**
 * Records a real-time test completion globally across all web visitors.
 */
export async function recordRealtimeCompletion(): Promise<AnalyticsData> {
  // 1. Try Vercel Serverless Function with action=complete
  try {
    const res = await fetch('/api/analytics?action=complete');
    if (res.ok) {
      const data = await res.json();
      if (data.success && typeof data.visits === 'number' && typeof data.completions === 'number') {
        const visits = BASELINE_VISITS + data.visits;
        const completions = BASELINE_COMPLETIONS + data.completions;
        saveLocalCache(visits, completions);
        return { visits, completions, isRealtime: true };
      }
    }
  } catch {
    // Fallback
  }

  // 2. Direct fallback to Global Abacus Service
  try {
    const [rawVisits, rawCompletions] = await Promise.all([
      callAbacus('get', 'visits'),
      callAbacus('hit', 'completions'),
    ]);

    if (rawVisits !== null && rawCompletions !== null) {
      const visits = BASELINE_VISITS + rawVisits;
      const completions = BASELINE_COMPLETIONS + rawCompletions;
      saveLocalCache(visits, completions);
      return { visits, completions, isRealtime: true };
    }
  } catch {
    // Fallback
  }

  // 3. Offline fallback
  const cached = getLocalCachedAnalytics();
  const updated = {
    visits: cached.visits,
    completions: cached.completions + 1,
    isRealtime: false,
  };
  saveLocalCache(updated.visits, updated.completions);
  return updated;
}
