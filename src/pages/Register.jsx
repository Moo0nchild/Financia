// Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../firebase/firebaseServices'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    documento: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipoCuenta: 'Ahorros', // valor por defecto
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

    if (formData.password !== formData.confirmPassword) {

  // Validación básica
  const validateForm = () => {
    const { nombres, apellidos, documento, telefono, direccion, fechaNacimiento, email, password, confirmPassword } = formData
    if (!nombres || !apellidos || !documento || !telefono || !direccion || !fechaNacimiento || !email || !password || !confirmPassword) {
      alert('Todos los campos son obligatorios')
      return false
    }
    if (password !== confirmPassword) {

      alert('Las contraseñas no coinciden')
      return false
    }
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const user = await registerUser(formData)

      alert(`Cuenta creada para: ${formData.nombres} ${formData.apellidos}. Revisa tu correo para verificar tu cuenta.`)
      console.log('Usuario registrado:', user)

      alert(`Cuenta creada para ${formData.nombres} ${formData.apellidos}. Revisa tu correo para verificar la cuenta.`)
      console.log('Usuario registrado:', user)

      // Limpiar formulario
      setFormData({
        nombres: '',
        apellidos: '',
        documento: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: '',
        email: '',
        password: '',
        confirmPassword: '',
        tipoCuenta: 'Ahorros',
      })

      // Redirigir a login
      navigate('/login')

    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='login-header'>
          <div className='login-icon'>🏦</div>
          <h1>Registro Bancario</h1>
          <p>Completa tus datos para abrir tu cuenta bancaria</p>
        </div>

        <form onSubmit={handleSubmit} className='login-form'>
          <label>Nombres</label>
          <input type='text' name='nombres' value={formData.nombres} onChange={handleChange} placeholder='Juan' />

          <label>Apellidos</label>
          <input type='text' name='apellidos' value={formData.apellidos} onChange={handleChange} placeholder='Pérez' />

          <label>Documento de Identidad</label>
          <input type='text' name='documento' value={formData.documento} onChange={handleChange} placeholder='Cédula o Pasaporte' />

          <label>Teléfono</label>
          <input type='tel' name='telefono' value={formData.telefono} onChange={handleChange} placeholder='3001234567' />

          <label>Dirección</label>
          <input type='text' name='direccion' value={formData.direccion} onChange={handleChange} placeholder='Calle 123 #45-67' />

          <label>Fecha de Nacimiento</label>
          <input type='date' name='fechaNacimiento' value={formData.fechaNacimiento} onChange={handleChange} />

          <label>Correo</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='you@example.com' />

          <label>Contraseña</label>
          <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='••••••••' />

          <label>Confirmar Contraseña</label>
          <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='••••••••' />

          <label>Tipo de Cuenta</label>
          <select name='tipoCuenta' value={formData.tipoCuenta} onChange={handleChange}>
            <option value='Ahorros'>Ahorros</option>
            <option value='Corriente'>Corriente</option>
          </select>

          <button type='submit' disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className='login-footer'>
          ¿Ya tienes cuenta? <Link to='/login' className='link'>Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
