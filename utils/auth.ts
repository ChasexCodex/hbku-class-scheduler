import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/utils/firebase";

export const login = async (data: FormData) => {
  const email = data.get('email') as string
  const password = data.get('password') as string

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return {success: true, data: res}
  }
  catch (e) {
    const {message} = e as Error
    return {success: false, error: message}
  }
}