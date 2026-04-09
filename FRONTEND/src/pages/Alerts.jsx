import { useState, useEffect } from 'react'
import { getLogs } from '../services/api'
import { POLL_INTERVAL_MS } from '../config'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAlerts = async () => {
    try {
      const logsData = await getLogs()
      // Filter to alert-type logs only
      const alertLogs = (logsData || []).filter(
        (log) => log.type === 'alert'
      )
      setAlerts(alertLogs)
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to fetch alerts')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const getAlertConfig = (eventCode) => {
    switch (eventCode) {
      case 'THEFT_DETECTED':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
          text: 'text-red-400',
          badge: 'bg-red-500/20 text-red-400',
          icon: '🚨',
          label: 'CRITICAL',
        }
      case 'SPEED_EXCEEDED':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500/20 text-yellow-400',
          icon: '⚠️',
          label: 'WARNING',
        }
      default:
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/20',
          text: 'text-orange-400',
          badge: 'bg-orange-500/20 text-orange-400',
          icon: '🔔',
          label: 'ALERT',
        }
    }
  }

  const formatTimestamp = (ts) => {
    if (!ts) return ''
    const date = new Date(ts)
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-vg-text-muted text-sm">Loading alerts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-vg-text">Security Alerts</h2>
          <p className="text-sm text-vg-text-muted mt-1">
            Monitoring theft detection, geofence violations, and system warnings
          </p>
        </div>
        <div className="flex items-center gap-3">
          {alerts.length > 0 && (
            <span className="text-sm bg-red-500/15 text-red-400 px-3 py-1.5 rounded-lg font-medium border border-red-500/20">
              {alerts.length} Active Alert{alerts.length !== 1 ? 's' : ''}
            </span>
          )}
          <button
            onClick={fetchAlerts}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-vg-border/30 text-vg-text-secondary hover:bg-white/10 hover:text-vg-text transition-all duration-200"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="glass-card p-4 border-red-500/30">
          <p className="text-sm text-red-400">⚠️ {error}</p>
        </div>
      )}

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-green-500/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-vg-text mb-2">
            All Clear
          </h3>
          <p className="text-sm text-vg-text-muted">
            No security alerts detected. Your vehicle is safe.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const config = getAlertConfig(alert.eventCode)
            return (
              <div
                key={alert._id || index}
                className={`glass-card p-4 ${config.border} animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{config.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${config.badge}`}
                      >
                        {config.label}
                      </span>
                      {alert.eventCode && (
                        <span className="text-[10px] font-mono text-vg-text-muted bg-white/5 px-1.5 py-0.5 rounded">
                          {alert.eventCode}
                        </span>
                      )}
                      <span className="text-xs text-vg-text-muted">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                    <p className={`text-sm font-medium ${config.text}`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
