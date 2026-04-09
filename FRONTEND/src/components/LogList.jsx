/**
 * LogList — Scrollable list of log entries with message, type badge, and timestamp.
 *
 * @param {Object} props
 * @param {Array} props.logs - Array of log objects { message, type, timestamp }
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.error - Error message
 * @param {string} props.title - Section title (default "System Logs")
 * @param {string} props.emptyMessage - Message when no logs exist
 */
export default function LogList({
  logs = [],
  isLoading = false,
  error = null,
  title = 'System Logs',
  emptyMessage = 'No logs recorded yet',
}) {
  const getTypeBadge = (type) => {
    switch (type?.toLowerCase()) {
      case 'alert':
        return 'bg-red-500/15 text-red-400 border-red-500/20'
      case 'control':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/20'
      default:
        return 'bg-blue-500/15 text-blue-400 border-blue-500/20'
    }
  }

  const formatTimestamp = (ts) => {
    if (!ts) return ''
    const date = new Date(ts)
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-vg-text-secondary uppercase tracking-wider mb-4">
          {title}
        </h3>
        <div className="flex items-center justify-center py-12">
          <div className="spinner" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-vg-text-secondary uppercase tracking-wider mb-4">
          {title}
        </h3>
        <div className="text-center py-8">
          <svg className="w-8 h-8 mx-auto mb-2 text-red-400 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-vg-text-secondary uppercase tracking-wider">
          {title}
        </h3>
        <span className="text-xs text-vg-text-muted">
          {logs.length} entr{logs.length === 1 ? 'y' : 'ies'}
        </span>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-12 text-vg-text-muted text-sm">
          <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {logs.map((log, index) => (
            <div
              key={log._id || index}
              className="flex items-start gap-3 py-3 px-4 rounded-xl bg-white/5 border border-vg-border/20 hover:bg-white/8 transition-colors duration-200 animate-fade-in"
              style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
            >
              {/* Type Badge + Event Code */}
              <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${getTypeBadge(
                    log.type
                  )}`}
                >
                  {log.type || 'info'}
                </span>
                {log.eventCode && (
                  <span className="text-[10px] font-mono text-vg-text-muted bg-white/5 px-1.5 py-0.5 rounded border border-vg-border/20">
                    {log.eventCode}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-vg-text">{log.message}</p>
                <p className="text-xs text-vg-text-muted mt-1">
                  {formatTimestamp(log.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
