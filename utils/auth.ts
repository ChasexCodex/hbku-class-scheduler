import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from '@firebase/auth'
import {auth} from '@/utils/firebase'
import {createStudentData} from '@/utils/students'

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

export const signup = async (data: FormData) => {
  const email = data.get('email') as string
  const password = data.get('password') as string

  try {
    const createUserResponse = await createUserWithEmailAndPassword(auth, email, password)
    const createStudentDataResponse = await createStudentData(createUserResponse.user.uid, {
      name: data.get('name') as string,
      year: data.get('year') as string,
      uid: data.get('uid') as string,
      texas_courses: [],
      hbku_courses: [],
    })
    return {success: createStudentDataResponse.success, data: {createUserResponse, res2: createStudentDataResponse}}
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