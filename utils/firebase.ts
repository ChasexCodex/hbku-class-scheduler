import {initializeApp} from 'firebase/app'
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore'
import {getAuth, connectAuthEmulator} from 'firebase/auth'
import config from '@/utils/config'

const firebaseConfig = config('firebase')

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)


if (config('env') === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true})
  connectFirestoreEmulator(db, 'localhost', 8080)
}
