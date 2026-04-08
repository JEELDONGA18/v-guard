import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import LiveTracking from './pages/LiveTracking'
import Alerts from './pages/Alerts'
import Logs from './pages/Logs'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Dashboard Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracking" element={<LiveTracking />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
