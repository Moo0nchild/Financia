import { useState } from 'react'
import { auth, db } from '../firebase/firabaseConfig.js'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) 

    try {
      const q = query(collection(db, "users"), where("uid", "==", uid))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        alert("No se encontró usuario con esa cédula")
        setLoading(false)
        return
      }

      const userData = querySnapshot.docs[0].data()
      const email = userData.Email

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      navigate("/home", { 
        state: { 
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            name: userData.name || "Sin nombre"
          }
        }
      })
    } catch (error) {
      alert("Error: " + error.message)
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
