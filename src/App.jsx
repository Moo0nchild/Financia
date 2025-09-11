import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Navigate } from 'react-router-dom'
import { Interes } from './pages/Interes'
import { InteresCompuesto } from './pages/interesCompuesto'
import { Anualidades } from './pages/Anualidades'
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/interes' element={<Interes />} />
      <Route path='/interesCompuesto' element={<InteresCompuesto />} />
      <Route path='/anualidades' element={<Anualidades />} />
    </Routes>
  )
}
