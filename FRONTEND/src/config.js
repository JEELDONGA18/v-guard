/**
 * ⚙️ Global App Configuration
 *
 * POLL_INTERVAL_MS — controls how often the frontend refreshes data from the backend.
 * Must match the backend TICK_INTERVAL_SECONDS (simulator.py).
 *
 * Examples:
 *   2000  = every 2 seconds  (fast / development)
 *   15000 = every 15 seconds
 *   30000 = every 30 seconds (slow / demo)
 */
export const POLL_INTERVAL_MS = 30000
