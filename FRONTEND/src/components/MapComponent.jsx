import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Default center — Ahmedabad, India
const DEFAULT_CENTER = [23.0225, 72.5714]
const DEFAULT_ZOOM = 15

// Dark-themed map tiles
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'

// Custom vehicle marker using a div icon for styling control
const vehicleIcon = L.divIcon({
  html: `
    <div class="vehicle-marker-container">
      <div class="vehicle-marker-pulse"></div>
      <div class="vehicle-marker-dot"></div>
    </div>
  `,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

/**
 * Sub-component that smoothly pans the map to follow the vehicle.
 */
function MapFollower({ position, follow }) {
  const map = useMap()
  const prevPos = useRef(position)

  useEffect(() => {
    if (!follow || !position) return

    // Only re-center if position changed significantly
    const [lat, lng] = position
    const [prevLat, prevLng] = prevPos.current || [0, 0]
    const dist = Math.abs(lat - prevLat) + Math.abs(lng - prevLng)

    if (dist > 0.0001) {
      map.panTo(position, { animate: true, duration: 1 })
      prevPos.current = position
    }
  }, [position, follow, map])

  return null
}

/**
 * Reusable Leaflet map component with dark tiles, vehicle marker, and optional trail.
 *
 * @param {Object} props
 * @param {number} props.latitude - Vehicle latitude
 * @param {number} props.longitude - Vehicle longitude
 * @param {Array} props.trail - Array of [lat, lng] pairs for the route trail
 * @param {boolean} props.autoCenter - Whether to auto-center on the vehicle
 * @param {number} props.zoom - Initial zoom level
 * @param {string} props.className - Additional CSS classes for the container
 * @param {boolean} props.fullScreen - Whether to render as full-screen
 */
export default function MapComponent({
  latitude,
  longitude,
  trail = [],
  autoCenter = true,
  zoom = DEFAULT_ZOOM,
  className = '',
  fullScreen = false,
}) {
  const hasPosition = latitude != null && longitude != null
  const position = hasPosition ? [latitude, longitude] : DEFAULT_CENTER

  return (
    <div className={`relative ${fullScreen ? 'h-full' : 'h-[400px]'} ${className}`}>
      <MapContainer
        center={position}
        zoom={zoom}
        className="w-full h-full rounded-2xl"
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />

        <MapFollower position={position} follow={autoCenter} />

        {hasPosition && (
          <Marker position={position} icon={vehicleIcon}>
            <Popup>
              <div className="text-slate-800 text-sm font-medium">
                <p className="font-bold mb-1">🚗 Vehicle Location</p>
                <p>Lat: {latitude?.toFixed(6)}</p>
                <p>Lng: {longitude?.toFixed(6)}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {trail.length > 1 && (
          <Polyline
            positions={trail}
            pathOptions={{
              color: '#3B82F6',
              weight: 3,
              opacity: 0.7,
              dashArray: '8, 6',
              lineCap: 'round',
            }}
          />
        )}
      </MapContainer>

      {/* Gradient overlay on bottom for aesthetics */}
      {!fullScreen && (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-vg-bg/60 to-transparent rounded-b-2xl pointer-events-none z-[2]" />
      )}
    </div>
  )
}
