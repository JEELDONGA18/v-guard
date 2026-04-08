import { useOutletContext } from 'react-router-dom'
import MapComponent from '../components/MapComponent'

export default function LiveTracking() {
  const { vehicleData, trail, isLoading, lastUpdated, clearTrail } =
    useOutletContext()

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-vg-text-muted text-sm">
            Connecting to vehicle...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col gap-4 animate-fade-in">
      {/* Info Strip */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-vg-text-muted">LAT:</span>
            <span className="font-mono font-semibold text-vg-text">
              {lat?.toFixed(6) ?? '—'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-vg-text-muted">LNG:</span>
            <span className="font-mono font-semibold text-vg-text">
              {lng?.toFixed(6) ?? '—'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-vg-text-muted">Speed:</span>
            <span className="font-mono font-semibold text-yellow-400">
              {speed?.toFixed(1) ?? '0.0'} km/h
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-vg-text-muted">Trail Points:</span>
            <span className="font-mono font-semibold text-blue-400">
              {trail.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-clear-trail"
            onClick={clearTrail}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-vg-border/30 text-vg-text-secondary hover:bg-white/10 hover:text-vg-text transition-all duration-200"
          >
            Clear Trail
          </button>
          <span className="text-xs text-vg-text-muted">
            Updated: {formatTime(lastUpdated)}
          </span>
        </div>
      </div>

      {/* Full-screen Map */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-vg-border/30">
        <MapComponent
          latitude={lat}
          longitude={lng}
          trail={trail}
          autoCenter={true}
          fullScreen={true}
          zoom={16}
        />
      </div>
    </div>
  )
}
