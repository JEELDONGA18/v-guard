import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useVehicleData } from '../hooks/useVehicleData'
import { POLL_INTERVAL_MS } from '../config'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/tracking': 'Live Tracking',
  '/alerts': 'Alerts',
  '/logs': 'System Logs',
  '/settings': 'Settings',
}

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  // Global vehicle data — shared across pages via Outlet context
  const vehicleState = useVehicleData(POLL_INTERVAL_MS)
  const { vehicleStatus, lastUpdated, error } = vehicleState

  const currentPage = pageTitles[location.pathname] || 'V-Guard'
  const isLocked = vehicleStatus?.lock === 'LOCKED'
  const engineOn = vehicleStatus?.engine === 'ON'

  const formatTime = (date) => {
    if (!date) return '—'
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date)
  }

  return (
    <div className="flex h-screen bg-vg-bg font-inter overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-vg-sidebar/80 backdrop-blur-xl border-b border-vg-border/50 flex items-center justify-between px-6 flex-shrink-0 z-10">
          {/* Page Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-vg-text">{currentPage}</h1>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-5">
            {/* Connection Status */}
            {error ? (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                <div className="status-dot offline" />
                <span>Disconnected</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                <div className="status-dot online" />
                <span>Connected</span>
              </div>
            )}

            {/* Engine Status */}
            <div className="flex items-center gap-2 text-xs text-vg-text-secondary bg-white/5 px-3 py-1.5 rounded-lg border border-vg-border/30">
              <div className={`status-dot ${engineOn ? 'online' : 'offline'}`} />
              <span>Engine {engineOn ? 'ON' : 'OFF'}</span>
            </div>

            {/* Lock Status */}
            <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border ${
              isLocked
                ? 'text-red-400 bg-red-500/10 border-red-500/20'
                : 'text-green-400 bg-green-500/10 border-green-500/20'
            }`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isLocked ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                )}
              </svg>
              <span>{isLocked ? 'Locked' : 'Unlocked'}</span>
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-2 text-xs text-vg-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Updated: {formatTime(lastUpdated)}</span>
            </div>
          </div>
        </header>

        {/* Page Content — each page receives vehicle state via Outlet context */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet context={vehicleState} />
        </main>
      </div>
    </div>
  )
}
