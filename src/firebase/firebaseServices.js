
import { auth, db } from './firabaseConfig.js'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const registerUser = async (userData) => {
  const { email, password, ...rest } = userData

  // Crear usuario
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  // Enviar correo de verificación
  await sendEmailVerification(userCredential.user)

  // Guardar datos en Firestore
  await setDoc(doc(db, 'users', userCredential.user.uid), rest)

  return userCredential.user
}


import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firabaseConfig'

export const registerUser = async (userData) => {
  const { email, password, nombres, apellidos, documento, telefono, direccion, fechaNacimiento, tipoCuenta = 'Ahorros' } = userData

  // Crear usuario en Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // Enviar correo de verificación
  await sendEmailVerification(user)

  // Generar número de cuenta aleatorio (ejemplo simple)
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
    verificado: false // lo actualizarás cuando confirme el correo
  })
  return user
}


export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: window.location.origin + '/login', 
      handleCodeInApp: false
    })
    alert('Se ha enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.')
  } catch (error) {
    alert('Error al enviar correo de restablecimiento: ' + error.message)
  }
}

