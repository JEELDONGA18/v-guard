import { Navigate } from 'react-router-dom'

/**
 * ProtectedRoute — redirects to /login if no userId is found in localStorage.
 * Wrap around any element that requires authentication.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if authenticated
 */
export default function ProtectedRoute({ children }) {
  const userId = localStorage.getItem('userId')

  if (!userId) {
    return <Navigate to="/login" replace />
  }

  return children
}
