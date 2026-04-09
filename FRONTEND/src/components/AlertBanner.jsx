/**
 * AlertBanner — Shows the most recent alerts/notifications as styled cards.
 *
 * @param {Object} props
 * @param {Array} props.alerts - Array of alert objects { message, type, timestamp }
 * @param {number} props.maxItems - Maximum number of alerts to show (default 5)
 */
export default function AlertBanner({ alerts = [], maxItems = 5 }) {
  const recentAlerts = alerts.slice(0, maxItems)

  const getAlertStyle = (eventCode) => {
    switch (eventCode) {
      case 'THEFT_DETECTED':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
          text: 'text-red-400',
          icon: '🚨',
        }
      case 'SPEED_EXCEEDED':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20',
          text: 'text-yellow-400',
          icon: '⚠️',
        }
      case 'GPS_SIGNAL_LOST':
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/20',
          text: 'text-orange-400',
          icon: '📡',
        }
      default:
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20',
          text: 'text-blue-400',
          icon: '🔔',
        }
    }
  }

  const formatTimestamp = (ts) => {
    if (!ts) return ''
    const date = new Date(ts)
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  }

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-vg-text-secondary uppercase tracking-wider">
          Recent Alerts
        </h3>
        {alerts.length > 0 && (
          <span className="text-xs bg-red-500/15 text-red-400 px-2.5 py-1 rounded-full font-medium">
            {alerts.length} Alert{alerts.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {recentAlerts.length === 0 ? (
        <div className="text-center py-8 text-vg-text-muted text-sm">
          <svg className="w-8 h-8 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          No alerts — all systems normal
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {recentAlerts.map((alert, index) => {
            const style = getAlertStyle(alert.eventCode)
            return (
              <div
                key={alert._id || index}
                className={`flex items-start gap-3 py-2.5 px-3 rounded-xl ${style.bg} border ${style.border} animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-base flex-shrink-0 mt-0.5">{style.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${style.text} truncate`}>
                    {alert.message}
                  </p>
                  <p className="text-xs text-vg-text-muted mt-0.5">
                    {formatTimestamp(alert.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
