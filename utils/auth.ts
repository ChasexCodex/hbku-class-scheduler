import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth'
import {auth} from '@/utils/firebase'
import {createStudentData} from '@/utils/students'
import config from '@/utils/config'
import {routes} from '@/utils/const'
import {User as FirebaseUser} from 'firebase/auth'
import {User} from '@/types'

export const login = async (data: FormData) => {
  const email = data.get('email') as string
  const password = data.get('password') as string

  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  return signOut(auth)
}

export const signup = (data: FormData) => {
  const email = data.get('email') as string
  const password = data.get('password') as string

  return createUserWithEmailAndPassword(auth, email, password)
    .then(async ({user}) => {
      await createStudentData(user.uid, {
        name: data.get('name') as string,
        year: data.get('year') as string,
        uid: data.get('uid') as string,
        texas_courses: [],
        hbku_courses: [],
      })
      return user
    })
}

export const onAuthStateChange = (callback: (user: User | undefined) => void) => {
  return auth.onAuthStateChanged(firebaseUser => {
    getUserFromAuth(firebaseUser).then(callback)
  })
}

export const sendVerificationEmail = (user: any) => {
  return Promise.resolve();
  return sendEmailVerification(user, {
    url: `${config('appUrl')}${routes.dashboard}`,
  })
}

export const getUserFromAuth = async (user: FirebaseUser | null): Promise<User | undefined> => {
  if (!user) return undefined

  const token = await user.getIdTokenResult()
  return {
    name: user.displayName || '',
    email: user.email || '',
    verified: user.emailVerified,
    admin: !!token.claims.admin,
    uid: user.uid,
  }
}