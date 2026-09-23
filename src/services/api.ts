import type { DemoRunResult, DemoScenario } from '../types/testing';
import { showcaseRun } from '../data/demoRun';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

/** Check if the backend demo service is reachable. */
export async function getHealth(): Promise<boolean> {
  if (!API_BASE_URL) return false;
  try {
    const resp = await fetch(`${API_BASE_URL}/api/health`, {
      signal: AbortSignal.timeout(5000),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

/** Fetch available demo scenarios from the backend. */
export async function getDemoScenarios(): Promise<DemoScenario[] | null> {
  if (!API_BASE_URL) return null;
  try {
    const resp = await fetch(`${API_BASE_URL}/api/demo/scenarios`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return data.scenarios ?? null;
  } catch {
    return null;
  }
}

/** Run a demo scenario against the live backend. */
export async function runDemo(scenario: string, input: Record<string, unknown>): Promise<DemoRunResult> {
  if (!API_BASE_URL) throw new Error('VITE_API_BASE_URL not configured');

  const resp = await fetch(`${API_BASE_URL}/api/demo/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario, input }),
    signal: AbortSignal.timeout(120000),
  });

  if (!resp.ok) throw new Error(`Backend error: ${resp.status}`);
  return (await resp.json()) as DemoRunResult;
}

/** Simulate a showcase run with staged delays for pipeline animation. */
export async function runShowcase(scenario: string): Promise<DemoRunResult> {
  // Simulate pipeline stages with delays for visual progression
  const delays = [600, 800, 1000, 700, 600];
  for (const d of delays) {
    await new Promise((r) => setTimeout(r, d));
  }
  // Return the verified showcase data (login scenario)
  return { ...showcaseRun, run_id: `showcase-${scenario}-${Date.now()}` };
}
