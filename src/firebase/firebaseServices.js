// firebaseServices.js
import { auth, db } from './firabaseConfig.js'
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail 
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

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
