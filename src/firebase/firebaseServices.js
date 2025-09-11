
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
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
