import { useState } from 'react'
import { resetPassword } from '../firebase/firebaseServices.js'
import { Link } from 'react-router-dom'

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
    <div className='min-h-screen w-full flex justify-center items-center font-sans p-4'>
      <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center mb-6'>
          Restablecer contraseña
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='text-left'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Correo
            </label>
            <input
              type='email'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-indigo-500 text-white font-semibold py-2 rounded-xl hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Enviar correo
          </button>
        </form>

        <p className='text-sm text-gray-600 mt-6 text-center'>
          <Link
            to='/login'
            className='text-indigo-500 font-semibold hover:underline'
          >
            Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
