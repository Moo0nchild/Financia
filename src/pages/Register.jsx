import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../firebase/firebaseServices'
import PageWrapper from '../components/PageWrapper'
import homeBackground from '../assets/FondoOficina.jpg' 
import Logo from '../assets/Logo.png'

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

      navigate('/login')
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div
        className='min-h-screen w-full flex justify-center items-center font-sans bg-cover bg-center p-4'
        style={{ backgroundImage: `url(${homeBackground})` }}
      >
        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50 text-white text-xl'>
            <div className='w-12 h-12 border-6 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4'></div>
            <p>Registrando...</p>
          </div>
        )}

        <div className='bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md'>
          <div className='text-center mb-6'>
            <div className=' '>
              <img src={Logo} alt="Logo" />
            </div>
            <h1 className='text-2xl font-semibold text-gray-800'>
              Registro Bancario
            </h1>
            <p className='text-sm text-gray-600 mt-1'>
              Completa tus datos para abrir tu cuenta bancaria
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-3'>
            {[
              { label: 'Nombres', name: 'nombres', type: 'text', placeholder: 'Juan' },
              { label: 'Apellidos', name: 'apellidos', type: 'text', placeholder: 'Pérez' },
              { label: 'Documento de Identidad', name: 'documento', type: 'text', placeholder: 'Cédula o Pasaporte' },
              { label: 'Teléfono', name: 'telefono', type: 'tel', placeholder: '3001234567' },
              { label: 'Dirección', name: 'direccion', type: 'text', placeholder: 'Calle 123 #45-67' },
              { label: 'Fecha de Nacimiento', name: 'fechaNacimiento', type: 'date' },
              { label: 'Correo', name: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Contraseña', name: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Confirmar Contraseña', name: 'confirmPassword', type: 'password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.name} className='text-left'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 
                             focus:border-transparent'
                />
              </div>
            ))}

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
              className='w-full bg-indigo-500 text-white font-semibold py-2 rounded-xl 
                         hover:bg-indigo-600 transition-colors duration-300 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:ring-offset-2 disabled:opacity-50 mt-4'
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
