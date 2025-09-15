// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider' // tu contexto de auth

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    // si no está logueado, redirige al login
    return <Navigate to='/login' replace />
  }

  return children // si está logueado, renderiza la ruta
}
