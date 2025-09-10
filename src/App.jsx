import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Navigate } from 'react-router-dom'
import { Interes } from './pages/Interes'
import { InteresCompuesto } from './pages/interesCompuesto'
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/interes' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/interes' element={<Interes />} />
      <Route path='/interesCompuesto' element={<InteresCompuesto />} />
    </Routes>
  )
}
