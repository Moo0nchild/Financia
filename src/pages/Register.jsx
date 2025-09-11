import { useState } from 'react'
import { auth } from '../firebase/firabaseConfig.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import '../styles/Register.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    try {
      const user = await registerUser(formData)
      alert(`Cuenta creada para: ${formData.nombres} ${formData.apellidos}. Revisa tu correo para verificar tu cuenta.`)
      console.log('Usuario registrado:', user)
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }


  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='login-header'>
          <div className='login-icon'>📝</div>
          <h1>Registro</h1>
          <p>Crea tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className='login-form'>
          <label>Correo</label>
          <input
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirmar contraseña</label>
          <input
            type='password'
            placeholder='••••••••'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type='submit'>Registrarse</button>
        </form>

        <p className='login-footer'>
          ¿Ya tienes cuenta?{' '}
          <Link to='/Login' className='link'>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
