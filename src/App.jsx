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

function AnimatedRoutes() {
  return (
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />

        <Route
          path='/interes'
          element={
            <Layout>
              <Interes />
            </Layout>
          }
        />
        <Route
          path='/interesSimple'
          element={
            <Layout>
              <InteresSimple />
            </Layout>
          }
        />
        <Route
          path='/interesCompuesto'
          element={
            <Layout>
              <InteresCompuesto />
            </Layout>
          }
        />
        <Route
          path='/anualidades'
          element={
            <Layout>
              <Anualidades />
            </Layout>
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
