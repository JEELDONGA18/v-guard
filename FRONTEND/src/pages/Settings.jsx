import { useState } from 'react'

export default function Settings() {
  const [pollingInterval, setPollingInterval] = useState(2000)
  const [simulationMode, setSimulationMode] = useState(true)
  const [darkTiles, setDarkTiles] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In a full implementation, these would persist to localStorage or backend
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-vg-text">Settings</h2>
        <p className="text-sm text-vg-text-muted mt-1">
          Configure your V-Guard system preferences
        </p>
      </div>

      {/* General Settings */}
      <div className="glass-card p-6 space-y-5">
        <h3 className="text-sm font-semibold text-vg-text-secondary uppercase tracking-wider">
          General
        </h3>

        {/* Polling Interval */}
        <div className="flex items-center justify-between py-3 border-b border-vg-border/20">
          <div>
            <p className="text-sm font-medium text-vg-text">Polling Interval</p>
            <p className="text-xs text-vg-text-muted mt-0.5">
              How often to fetch vehicle data from the server
            </p>
          </div>
          <select
            id="setting-polling"
            value={pollingInterval}
            onChange={(e) => setPollingInterval(Number(e.target.value))}
            className="bg-white/5 border border-vg-border/30 rounded-lg px-3 py-1.5 text-sm text-vg-text focus:outline-none focus:border-vg-accent/50"
          >
            <option value={1000}>1 second</option>
            <option value={2000}>2 seconds</option>
            <option value={3000}>3 seconds</option>
            <option value={5000}>5 seconds</option>
          </select>
        </div>

        {/* Simulation Mode */}
        <div className="flex items-center justify-between py-3 border-b border-vg-border/20">
          <div>
            <p className="text-sm font-medium text-vg-text">Simulation Mode</p>
            <p className="text-xs text-vg-text-muted mt-0.5">
              Generate simulated GPS data when no hardware is connected
            </p>
          </div>
          <button
            id="setting-simulation"
            onClick={() => setSimulationMode(!simulationMode)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
              simulationMode ? 'bg-vg-accent' : 'bg-vg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                simulationMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Dark Map Tiles */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-vg-text">Dark Map Tiles</p>
            <p className="text-xs text-vg-text-muted mt-0.5">
              Use dark-themed CartoDB tiles for the map
            </p>
          </div>
          <button
            id="setting-dark-tiles"
            onClick={() => setDarkTiles(!darkTiles)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
              darkTiles ? 'bg-vg-accent' : 'bg-vg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                darkTiles ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* System Info */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-sm font-semibold text-vg-text-secondary uppercase tracking-wider">
          System Information
        </h3>

        {[
          { label: 'Project', value: 'V-Guard IoT Vehicle Tracking' },
          { label: 'Version', value: '1.0.0' },
          { label: 'Backend', value: 'FastAPI + MongoDB' },
          { label: 'Frontend', value: 'React + Vite + Tailwind CSS' },
          { label: 'Hardware', value: 'ESP32 + NEO-6M GPS' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-2"
          >
            <span className="text-sm text-vg-text-muted">{item.label}</span>
            <span className="text-sm font-medium text-vg-text">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        id="btn-save-settings"
        onClick={handleSave}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
          saved
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-vg-accent/15 text-vg-accent-light border border-vg-accent/30 hover:bg-vg-accent/25 active:scale-[0.98]'
        }`}
      >
        {saved ? '✓ Settings Saved' : 'Save Settings'}
      </button>
    </div>
  )
}
