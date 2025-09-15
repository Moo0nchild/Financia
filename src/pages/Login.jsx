// Login.jsx
import { useState } from 'react'
import { auth, db } from '../firebase/firabaseConfig.js'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore'
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import PageWrapper from '../components/PageWrapper.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [canResend, setCanResend] = useState(false)
  const [userForResend, setUserForResend] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Buscar usuario por cédula
      const q = query(collection(db, 'users'), where('documento', '==', uid))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        alert('No se encontró usuario con esa cédula')
        setLoading(false)
        return
      }

      const userDoc = querySnapshot.docs[0]
      const userData = userDoc.data()
      const email = userData.email

      // Iniciar sesión con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Verificar correo
      if (!user.emailVerified) {
        alert(
          'Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.'
        )
        setCanResend(true)
        setUserForResend(user)
        setLoading(false)
        return
      }

      // Actualizar Firestore si no estaba marcado como verificado
      if (!userData.verificado) {
        await updateDoc(doc(db, 'users', user.uid), { verificado: true })
      }

      // Redirigir a home
      navigate('/home', {
        state: {
          user: {
            uid: user.uid,
            email: user.email,
            name: userData.nombres || 'Sin nombre',
          },
        },
      })
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!userForResend) return
    setLoading(true)
    try {
      await sendEmailVerification(userForResend, {
        url: window.location.origin + '/login',
        handleCodeInApp: false,
      })
      alert('Correo de verificación reenviado. Revisa tu bandeja de entrada.')
      setCanResend(false)
    } catch (error) {
      alert('Error al reenviar el correo: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div className='min-h-screen w-full flex justify-center items-center font-sans'>
        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50 text-white text-xl'>
            <div className='w-12 h-12 border-6 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4'></div>
            <p>Cargando...</p>
          </div>
        )}

        <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'>
          <div className='text-center mb-6'>
            <img
              src={Logo}
              alt='LOGO'
              className='w-50 h-18 mx-auto mb-4 bg-indigo-50 rounded-lg p-2 shadow-md'
            />
            <h1 className='text-2xl font-semibold text-gray-800'>Bienvenido</h1>
            <p className='text-sm text-gray-600 mt-1'>
              Inicia sesión para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4 mt-6'>
            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Cédula
              </label>
              <input
                type='text'
                placeholder='12345'
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='text-left'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Contraseña
              </label>
              <input
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-indigo-500 text-white font-semibold py-2 rounded-xl hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50'
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </form>

          {canResend && (
            <button
              onClick={handleResendVerification}
              className='w-full mt-4 bg-purple-500 text-white font-semibold py-2 rounded-xl hover:bg-purple-600 transition-colors duration-300'
            >
              Reenviar correo de verificación
            </button>
          )}

          <div className='mt-6 space-y-2'>
            <p className='text-sm text-gray-600'>
              ¿No tienes cuenta?{' '}
              <Link
                to='/register'
                className='text-indigo-500 font-semibold hover:underline'
              >
                Regístrate
              </Link>
            </p>
            <p className='text-sm text-gray-600'>
              Olvidé mi contraseña{' '}
              <Link
                to='/ForgotPassword'
                className='text-indigo-500 font-semibold hover:underline'
              >
                Restablecer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
