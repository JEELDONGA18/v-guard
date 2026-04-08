import { useState } from 'react'
import { sendControl } from '../services/api'

/**
 * ControlPanel — Lock/Unlock buttons and engine status indicator.
 *
 * @param {Object} props
 * @param {Object} props.vehicleStatus - { lockState: "LOCKED"|"UNLOCKED", engineState: "ON"|"OFF" }
 * @param {Function} props.onStatusChange - Callback after a control command succeeds
 */
export default function ControlPanel({ vehicleStatus, onStatusChange }) {
  const [loading, setLoading] = useState(null) // 'LOCK' | 'UNLOCK' | null
  const [error, setError] = useState(null)

  const isLocked = vehicleStatus?.lockState === 'LOCKED'
  const engineOn = vehicleStatus?.engineState === 'ON'

  const handleControl = async (action) => {
    setLoading(action)
    setError(null)
    try {
      await sendControl(action)
      if (onStatusChange) onStatusChange()
    } catch (err) {
      setError(`Failed to ${action.toLowerCase()} vehicle`)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-vg-text-secondary uppercase tracking-wider mb-4">
        Vehicle Control
      </h3>

      {/* Control Buttons */}
      <div className="flex gap-3 mb-5">
        <button
          id="btn-lock"
          onClick={() => handleControl('LOCK')}
          disabled={loading !== null || isLocked}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
            ${
              isLocked
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 cursor-default'
                : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10 active:scale-95'
            }
            ${loading === 'LOCK' ? 'opacity-60' : ''}
          `}
        >
          {loading === 'LOCK' ? (
            <div className="spinner !w-4 !h-4 !border-red-400 !border-t-transparent" />
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
          LOCK
        </button>

        <button
          id="btn-unlock"
          onClick={() => handleControl('UNLOCK')}
          disabled={loading !== null || !isLocked}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
            ${
              !isLocked
                ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                : 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/25 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 active:scale-95'
            }
            ${loading === 'UNLOCK' ? 'opacity-60' : ''}
          `}
        >
          {loading === 'UNLOCK' ? (
            <div className="spinner !w-4 !h-4 !border-green-400 !border-t-transparent" />
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          )}
          UNLOCK
        </button>
      </div>

      {/* Engine Status */}
      <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-vg-border/30">
        <div className="flex items-center gap-3">
          <div className={`status-dot ${engineOn ? 'online' : 'offline'}`} />
          <span className="text-sm text-vg-text-secondary">Engine Status</span>
        </div>
        <span className={`text-sm font-bold ${engineOn ? 'text-green-400' : 'text-red-400'}`}>
          {engineOn ? 'RUNNING' : 'OFF'}
        </span>
      </div>

      {/* Lock Status */}
      <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-vg-border/30 mt-2">
        <div className="flex items-center gap-3">
          <svg
            className={`w-4 h-4 ${isLocked ? 'text-red-400' : 'text-green-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isLocked ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            )}
          </svg>
          <span className="text-sm text-vg-text-secondary">Lock Status</span>
        </div>
        <span className={`text-sm font-bold ${isLocked ? 'text-red-400' : 'text-green-400'}`}>
          {isLocked ? 'LOCKED' : 'UNLOCKED'}
        </span>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-3 py-2 px-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          {error}
        </div>
      )}
    </div>
  )
}
