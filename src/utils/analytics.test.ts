import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getLocalCachedAnalytics,
  recordRealtimeVisit,
  recordRealtimeCompletion,
  fetchLiveAnalytics,
} from './analytics';

class MemoryStorage implements Storage {
  private store: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] ?? null;
  }
}

describe('Real-Time Global Analytics Utility', () => {
  beforeEach(() => {
    const memoryLocalStorage = new MemoryStorage();
    const memorySessionStorage = new MemoryStorage();

    (globalThis as unknown as { window: unknown }).window = {
      localStorage: memoryLocalStorage,
      sessionStorage: memorySessionStorage,
    };

    // Reset fetch mock
    vi.restoreAllMocks();
  });

  it('returns baseline cached values when storage and network are clean', () => {
    const data = getLocalCachedAnalytics();
    expect(data.visits).toBe(1);
    expect(data.completions).toBe(1);
  });

  it('records a real-time visit with fallback when network is simulated offline', async () => {
    // Simulate offline fetch rejection
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    const initial = getLocalCachedAnalytics();
    const updated = await recordRealtimeVisit();
    expect(updated.visits).toBe(initial.visits + 1);

    // Second call in same session shouldn't double count
    const second = await recordRealtimeVisit();
    expect(second.visits).toBe(updated.visits);
  });

  it('records real-time completion when network is offline', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    const initial = getLocalCachedAnalytics();
    const updated = await recordRealtimeCompletion();
    expect(updated.completions).toBe(initial.completions + 1);
  });

  it('successfully integrates with remote API response when online', async () => {
    const mockApiResponse = {
      success: true,
      visits: 42,
      completions: 17,
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      })
    );

    const data = await fetchLiveAnalytics();
    expect(data.isRealtime).toBe(true);
    expect(data.visits).toBe(1 + 42);
    expect(data.completions).toBe(1 + 17);
  });
});
