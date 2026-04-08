import { useState, useEffect, useCallback, useRef } from 'react'
import { getVehicleData, getVehicleStatus } from '../services/api'

const MAX_TRAIL_POINTS = 100

/**
 * Custom hook that polls the backend for vehicle data and status.
 * Returns the latest data, trail history, loading/error state, and a timestamp.
 *
 * @param {number} pollingInterval - Milliseconds between polls (default 2000)
 */
export function useVehicleData(pollingInterval = 2000) {
  const [vehicleData, setVehicleData] = useState(null)
  const [vehicleStatus, setVehicleStatus] = useState(null)
  const [trail, setTrail] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const trailRef = useRef([])

  const fetchData = useCallback(async () => {
    try {
      const [dataRes, statusRes] = await Promise.all([
        getVehicleData(),
        getVehicleStatus(),
      ])

      setVehicleData(dataRes)
      setVehicleStatus(statusRes)

      // Build trail from incoming GPS data
      if (dataRes?.latitude && dataRes?.longitude) {
        const newPoint = [dataRes.latitude, dataRes.longitude]
        const lastPoint = trailRef.current[trailRef.current.length - 1]

        // Only add if position actually changed
        if (
          !lastPoint ||
          lastPoint[0] !== newPoint[0] ||
          lastPoint[1] !== newPoint[1]
        ) {
          trailRef.current = [
            ...trailRef.current.slice(-MAX_TRAIL_POINTS),
            newPoint,
          ]
          setTrail([...trailRef.current])
        }
      }

      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to fetch vehicle data')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, pollingInterval)
    return () => clearInterval(interval)
  }, [fetchData, pollingInterval])

  /** Force a refresh of the data */
  const refresh = useCallback(() => {
    setIsLoading(true)
    fetchData()
  }, [fetchData])

  /** Clear the trail history */
  const clearTrail = useCallback(() => {
    trailRef.current = []
    setTrail([])
  }, [])

  return {
    vehicleData,
    vehicleStatus,
    trail,
    isLoading,
    error,
    lastUpdated,
    refresh,
    clearTrail,
  }
}
