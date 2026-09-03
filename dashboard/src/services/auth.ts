import { GoogleAuthProvider, browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'

export async function login(email: string, password: string) {
  await setPersistence(auth, browserLocalPersistence)
  return signInWithEmailAndPassword(auth, email, password)
}

export async function register(email: string, password: string) {
  await setPersistence(auth, browserLocalPersistence)
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function loginWithGoogle() {
  await setPersistence(auth, browserLocalPersistence)
  return signInWithPopup(auth, googleProvider as GoogleAuthProvider)
}

export function observeAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email)
export const logout = () => signOut(auth)