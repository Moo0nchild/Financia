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
