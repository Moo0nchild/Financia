// firebaseServices.js
import { auth, db } from './firabaseConfig.js'
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signOut
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export const registerUser = async (userData) => {
  const { email, password, nombres, apellidos, documento, telefono, direccion, fechaNacimiento, tipoCuenta = 'Ahorros' } = userData

  try {
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Enviar correo de verificación
    await sendEmailVerification(user)

    // Generar número de cuenta aleatorio
    const cuentaBancaria = 'BC' + Math.floor(10000000 + Math.random() * 90000000)

    // Guardar datos en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      nombres,
      apellidos,
      documento,
      telefono,
      direccion,
      fechaNacimiento,
      email,
      uid: user.uid,
      cuentaBancaria,
      tipoCuenta,
      saldo: 0,
      fechaCreacionCuenta: serverTimestamp(),
      verificado: false // luego lo actualizas al confirmar correo
    })

    return user
  } catch (error) {
    console.error("Error en registerUser:", error)
    throw error // para manejarlo en el componente
  }
}

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Se ha enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.')
  } catch (error) {
    console.error("Error en resetPassword:", error)
    alert('Error al enviar correo de restablecimiento: ' + error.message)
  }
}


export async function obtenerDatosUsuario() {
  const user = auth.currentUser
  if (!user) return null // No hay usuario logueado

  // Referencia al documento
  const docRef = doc(db, 'users', user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    console.log('Nombre:', data.nombres)
    console.log('Número de cuenta:', data.cuentaBancaria)
    return data
  } else {
    console.log('No se encontró el usuario en la base de datos')
    return null
  }
}

const navigate = useNavigate()

export const handleLogout = async () => {
  try {
    await signOut(auth)
    console.log('Sesión cerrada correctamente')
    // Redirigir al login u otra página
    navigate('/')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}