import {initializeApp} from 'firebase/app'
import {connectFirestoreEmulator, getFirestore, setLogLevel} from 'firebase/firestore'
import {connectAuthEmulator, getAuth} from 'firebase/auth'
import config from '@/utils/config'

const firebaseConfig = config('firebase')

const dev = config('env') === 'development'

export const app = initializeApp(firebaseConfig)

const _auth = getAuth(app)
if (dev) {
  console.log('Connecting to Auth emulator')
  connectAuthEmulator(_auth, 'http://127.0.0.1:9099', {disableWarnings: true})
}
export const auth = _auth

const _db = getFirestore(app)
if (dev) {
  console.log('Connecting to Firestore emulator')
  connectFirestoreEmulator(_db, '127.0.0.1', 8080)
}

setLogLevel('debug');

export const db = _db