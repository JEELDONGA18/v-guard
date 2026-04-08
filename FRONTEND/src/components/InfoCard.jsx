/**
 * InfoCard — Displays vehicle telemetry: latitude, longitude, speed, and last updated time.
 *
 * @param {Object} props
 * @param {Object} props.vehicleData - { latitude, longitude, speed }
 * @param {Date} props.lastUpdated - Timestamp of last data update
 */
export default function InfoCard({ vehicleData, lastUpdated }) {
  const lat = vehicleData?.latitude
  const lng = vehicleData?.longitude
  const speed = vehicleData?.speed

  const formatTime = (date) => {
    if (!date) return '—'
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date)
  }

  const dataItems = [
    {
      label: 'Latitude',
      value: lat != null ? lat.toFixed(6) : '—',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        </svg>
      ),
      color: 'text-blue-400',
    },
    {
      label: 'Longitude',
      value: lng != null ? lng.toFixed(6) : '—',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 012-2V7a2 2 0 012-2h2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-purple-400',
    },
    {
      label: 'Speed',
      value: speed != null ? `${speed.toFixed(1)} km/h` : '—',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'text-yellow-400',
    },
  ]

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-vg-text-secondary uppercase tracking-wider">
          Vehicle Info
        </h3>
        <div className="flex items-center gap-2 text-xs text-vg-text-muted">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatTime(lastUpdated)}
        </div>
      </div>

      <div className="space-y-3">
        {dataItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-vg-border/30 transition-all duration-200 hover:bg-white/8"
          >
            <div className="flex items-center gap-3">
              <span className={item.color}>{item.icon}</span>
              <span className="text-sm text-vg-text-secondary">{item.label}</span>
            </div>
            <span className="text-sm font-mono font-semibold text-vg-text">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
