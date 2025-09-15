// src/context/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/firabaseConfig' // tu configuración de Firebase
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Escuchar cambios de sesión en Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  // Cierre automático por tiempo fijo (ej: 30 min)
  useEffect(() => {
    if (!user) return
    const timer = setTimeout(() => {
      signOut(auth)
      alert('Sesión expirada por tiempo.')
      navigate('/login')
    }, 30 * 60 * 1000) // 30 minutos
    return () => clearTimeout(timer)
  }, [user, navigate])

  // Cierre automático por inactividad (ej: 15 min sin movimiento)
  useEffect(() => {
    if (!user) return

    let inactivityTimer

    const resetTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        signOut(auth)
        alert('Sesión cerrada por inactividad.')
        navigate('/login')
      }, 3 * 60 * 1000) // 15 minutos
    }

    // eventos de actividad
    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keydown', resetTimer)
    window.addEventListener('click', resetTimer)

    resetTimer() // iniciar contador

    return () => {
      clearTimeout(inactivityTimer)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keydown', resetTimer)
      window.removeEventListener('click', resetTimer)
    }
  }, [user, navigate])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
