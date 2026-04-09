import { useState, useEffect } from 'react'
import LogList from '../components/LogList'
import { getLogs } from '../services/api'
import { POLL_INTERVAL_MS } from '../config'

export default function Logs() {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  const fetchLogs = async () => {
    try {
      const data = await getLogs()
      setLogs(data || [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to fetch logs')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
    const interval = setInterval(fetchLogs, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const filterOptions = [
    { value: 'all', label: 'All Logs' },
    { value: 'info', label: 'Info' },
    { value: 'alert', label: 'Alerts' },
    { value: 'control', label: 'Control' },
  ]

  const filteredLogs =
    filter === 'all' ? logs : logs.filter((log) => log.type === filter)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-vg-text">System Logs</h2>
          <p className="text-sm text-vg-text-muted mt-1">
            Complete history of vehicle events, controls, and system activity
          </p>
        </div>
        <button
          onClick={() => {
            setIsLoading(true)
            fetchLogs()
          }}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-vg-border/30 text-vg-text-secondary hover:bg-white/10 hover:text-vg-text transition-all duration-200"
        >
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
              filter === opt.value
                ? 'bg-vg-accent/15 text-vg-accent-light border-vg-accent/30'
                : 'bg-white/5 text-vg-text-muted border-vg-border/30 hover:bg-white/10 hover:text-vg-text-secondary'
            }`}
          >
            {opt.label}
            {filter === opt.value && ` (${filteredLogs.length})`}
          </button>
        ))}
      </div>

      {/* Logs List */}
      <LogList
        logs={filteredLogs}
        isLoading={isLoading}
        error={error}
        title={filter === 'all' ? 'All Logs' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Logs`}
        emptyMessage={
          filter === 'all'
            ? 'No logs recorded yet. Activity will appear here.'
            : `No ${filter} logs found.`
        }
      />
    </div>
  )
}
