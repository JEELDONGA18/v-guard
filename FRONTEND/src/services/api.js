import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ——— Vehicle Data ———

/** Fetch the latest vehicle GPS data */
export async function getVehicleData() {
  try {
    const response = await api.get('/vehicle/data')
    return response.data
  } catch (error) {
    console.error('Failed to fetch vehicle data:', error.message)
    throw error
  }
}

/** Send GPS data (used by ESP32 or simulator) */
export async function postVehicleData(data) {
  try {
    const response = await api.post('/vehicle/data', data)
    return response.data
  } catch (error) {
    console.error('Failed to post vehicle data:', error.message)
    throw error
  }
}

// ——— Vehicle Control ———

/** Send a control command: LOCK or UNLOCK */
export async function sendControl(action) {
  try {
    const response = await api.post('/vehicle/control', { action })
    return response.data
  } catch (error) {
    console.error('Failed to send control command:', error.message)
    throw error
  }
}

/** Get current vehicle status (lock state, engine state) */
export async function getVehicleStatus() {
  try {
    const response = await api.get('/vehicle/status')
    return response.data
  } catch (error) {
    console.error('Failed to fetch vehicle status:', error.message)
    throw error
  }
}

// ——— Logs ———

/** Fetch all logs */
export async function getLogs() {
  try {
    const response = await api.get('/logs')
    return response.data
  } catch (error) {
    console.error('Failed to fetch logs:', error.message)
    throw error
  }
}

/** Add a manual log entry */
export async function postLog(logEntry) {
  try {
    const response = await api.post('/logs', logEntry)
    return response.data
  } catch (error) {
    console.error('Failed to post log:', error.message)
    throw error
  }
}

export default api
