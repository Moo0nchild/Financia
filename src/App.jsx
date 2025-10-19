import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Navigate } from 'react-router-dom'
import { Interes } from './pages/Interes'
import { InteresCompuesto } from './pages/interesCompuesto'
import { Anualidades } from './pages/Anualidades'
import Home from './pages/HomePage'

import ForgotPassword from './pages/ForgotPassword'
import { InteresSimple } from './pages/InteresSimple'

import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import { AuthProvider } from './pages/AuthProvider'
import ServiciosPage from './pages/servicios'
import ProtectedRoute from './pages/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { GradientesSeriesVariables } from './pages/GradientesSeriesVariables'
import { Amortizacion } from './pages/Amortizacion'

function AnimatedRoutes() {
  return (
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/servicios' element={<ServiciosPage />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/interes'
          element={
            <ProtectedRoute>
              <Layout>
                <Interes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/interesSimple'
          element={
            <ProtectedRoute>
              <Layout>
                <InteresSimple />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/interesCompuesto'
          element={
            <ProtectedRoute>
              <Layout>
                <InteresCompuesto />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/anualidades'
          element={
            <ProtectedRoute>
              <Layout>
                <Anualidades />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/gradientes'
          element={
            <ProtectedRoute>
              <Layout>
                <GradientesSeriesVariables />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/amortizacion'
          element={
            <ProtectedRoute>
              <Layout>
                <Amortizacion />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AnimatedRoutes />
    </AuthProvider>
  )
}
