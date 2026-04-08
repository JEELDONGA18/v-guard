import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import MapComponent from '../components/MapComponent'
import ControlPanel from '../components/ControlPanel'
import InfoCard from '../components/InfoCard'
import AlertBanner from '../components/AlertBanner'
import { getLogs } from '../services/api'

export default function Dashboard() {
  const { vehicleData, vehicleStatus, trail, isLoading, lastUpdated, refresh } =
    useOutletContext()
  const [alerts, setAlerts] = useState([])

  // Fetch alert-type logs for the alert banner
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const logsData = await getLogs()
        const alertLogs = (logsData || []).filter(
          (log) =>
            log.type === 'alert' ||
            log.type === 'danger' ||
            log.type === 'warning'
        )
        setAlerts(alertLogs.slice(0, 10))
      } catch {
        // Silently fail — alerts are non-critical
      }
    }
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 5000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-vg-text-muted text-sm">Loading vehicle data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Row: Map + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section (2/3 width) */}
        <div className="lg:col-span-2">
          <MapComponent
            latitude={vehicleData?.latitude}
            longitude={vehicleData?.longitude}
            trail={trail}
            autoCenter={true}
          />
        </div>

        {/* Control Panel (1/3 width) */}
        <div className="space-y-6">
          <ControlPanel
            vehicleStatus={vehicleStatus}
            onStatusChange={refresh}
          />
          <InfoCard vehicleData={vehicleData} lastUpdated={lastUpdated} />
        </div>
      </div>

      {/* Bottom Row: Alerts */}
      <AlertBanner alerts={alerts} maxItems={5} />
    </div>
  )
}
