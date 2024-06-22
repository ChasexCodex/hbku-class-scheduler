import {signInWithEmailAndPassword, signOut} from "@firebase/auth";
import {auth} from "@/utils/firebase";

export const login = async (data: FormData) => {
  const email = data.get('email') as string
  const password = data.get('password') as string

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return {success: true, data: res}
  } catch (e) {
    const {message} = e as Error
    return {success: false, error: message}
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    return {success: true}
  } catch (e) {
    const {message} = e as Error
    return {success: false, error: message}
  }
}

export const onAuthStateChange = (callback: (user: any) => void) => {
  return auth.onAuthStateChanged(user => {
    callback(user)
  })
}