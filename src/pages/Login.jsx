// Login.jsx
import { useState } from 'react'
import { auth, db } from '../firebase/firabaseConfig.js'
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [canResend, setCanResend] = useState(false)
  const [userForResend, setUserForResend] = useState(null) // almacenar userCredential.user

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) 

    try {
      // Buscar usuario por cédula
      const q = query(collection(db, "users"), where("documento", "==", uid))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        alert("No se encontró usuario con esa cédula")
        setLoading(false)
        return
      }

      const userDoc = querySnapshot.docs[0]
      const userData = userDoc.data()
      const email = userData.email

      // Iniciar sesión con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Verificar correo
      if (!user.emailVerified) {
        alert("Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.")
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
      navigate("/home", { 
        state: { 
          user: {
            uid: user.uid,
            email: user.email,
            name: userData.nombres || "Sin nombre"
          }
        }
      })
    } catch (error) {
      alert("Error: " + error.message)
    } finally {
      setLoading(false) 
    }
  }

  const handleResendVerification = async () => {
    if (!userForResend) return
    setLoading(true)
    try {
      await sendEmailVerification(userForResend, {
        url: 'http://localhost:5173/login',
        handleCodeInApp: false
      })
      alert("Correo de verificación reenviado. Revisa tu bandeja de entrada.")
      setCanResend(false)
    } catch (error) {
      alert("Error al reenviar el correo: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-container'>
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      )}

      <div className='login-card'>
        <div className='login-header'>
          <div className='login-icon'>🔐</div>
          <h1>Bienvenido</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className='login-form'>
          <label>Cédula</label>
          <input
            type='text'
            placeholder='12345'
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit' disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        {canResend && (
          <button onClick={handleResendVerification} className='resend-btn'>
            Reenviar correo de verificación
          </button>
        )}

        <p className='login-footer'>
          ¿No tienes cuenta?{' '}
          <Link to='/register' className='link'>
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
