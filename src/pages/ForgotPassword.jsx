import { useState } from 'react'
import { resetPassword } from '../firebase/firebaseServices.js'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      alert('Ingresa tu correo')
      return
    }
    await resetPassword(email)
    setEmail('')
  }

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h2>Restablecer contraseña</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          <label>Correo</label>
          <input
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='submit'>Enviar correo</button>
        </form>
        <p>
          <Link to='/login'>Volver al inicio de sesión</Link>
        </p>
      </div>
    </div>
  )
}
