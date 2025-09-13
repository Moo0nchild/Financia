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
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgotPassword' element={<ForgotPassword />} />

      <Route path='/interes' element={<Interes />} />
      <Route path='/interesSimple' element={<InteresSimple />} />
      <Route path='/interesCompuesto' element={<InteresCompuesto />} />
      <Route path='/anualidades' element={<Anualidades />} />
    </Routes>
  )
}
//? Se supone que / es la ruta principal, debemos saber si dejamos el login como entrada principal
//? o cambiamos y dejamos el home como entrada principal
