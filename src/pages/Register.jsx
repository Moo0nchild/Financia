// Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../firebase/firebaseServices'
import PageWrapper from '../components/PageWrapper'

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
    tipoCuenta: 'Ahorros',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Validación básica
  const validateForm = () => {
    const {
      nombres,
      apellidos,
      documento,
      telefono,
      direccion,
      fechaNacimiento,
      email,
      password,
      confirmPassword,
    } = formData
    if (
      !nombres ||
      !apellidos ||
      !documento ||
      !telefono ||
      !direccion ||
      !fechaNacimiento ||
      !email ||
      !password ||
      !confirmPassword
    ) {
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
      alert(
        `Cuenta creada para ${formData.nombres} ${formData.apellidos}. Revisa tu correo para verificar la cuenta.`
      )
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
    <PageWrapper>
      <div className='min-h-screen w-full flex justify-center items-center font-sans p-4'>
        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50 text-white text-xl'>
            <div className='w-12 h-12 border-6 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4'></div>
            <p>Registrando...</p>
          </div>
        )}

        <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'>
          <div className='text-center mb-6'>
            <div className='w-50 h-18 mx-auto mb-4 bg-indigo-50 rounded-lg p-2 shadow-md flex items-center justify-center text-3xl'>
              🏦
            </div>
            <h1 className='text-2xl font-semibold text-gray-800'>
              Registro Bancario
            </h1>
            <p className='text-sm text-gray-600 mt-1'>
              Completa tus datos para abrir tu cuenta bancaria
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-3'>
            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Nombres
              </label>
              <input
                type='text'
                name='nombres'
                value={formData.nombres}
                onChange={handleChange}
                placeholder='Juan'
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Apellidos
              </label>
              <input
                type='text'
                name='apellidos'
                value={formData.apellidos}
                onChange={handleChange}
                placeholder='Pérez'
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Documento de Identidad
              </label>
              <input
                type='text'
                name='documento'
                value={formData.documento}
                onChange={handleChange}
                placeholder='Cédula o Pasaporte'
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Teléfono
              </label>
              <input
                type='tel'
                name='telefono'
                value={formData.telefono}
                onChange={handleChange}
                placeholder='3001234567'
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Dirección
              </label>
              <input
                type='text'
                name='direccion'
                value={formData.direccion}
                onChange={handleChange}
                placeholder='Calle 123 #45-67'
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Fecha de Nacimiento
              </label>
              <input
                type='date'
                name='fechaNacimiento'
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Correo
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='you@example.com'
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Contraseña
              </label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='••••••••'
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Confirmar Contraseña
              </label>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='••••••••'
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Tipo de Cuenta
              </label>
              <select
                name='tipoCuenta'
                value={formData.tipoCuenta}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              >
                <option value='Ahorros'>Ahorros</option>
                <option value='Corriente'>Corriente</option>
              </select>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-indigo-500 text-white font-semibold py-2 rounded-xl hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 mt-4'
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <p className='text-sm text-gray-600 mt-6 text-center'>
            ¿Ya tienes cuenta?{' '}
            <Link
              to='/login'
              className='text-indigo-500 font-semibold hover:underline'
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
