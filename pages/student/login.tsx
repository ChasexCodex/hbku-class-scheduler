import {Inter} from 'next/font/google'
import {useState} from 'react'
import {useRouter} from 'next/router'
import {login, signup} from '@/utils/auth'
import AuthGuard from '@/components/AuthGuard'

const inter = Inter({subsets: ['latin']})

function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>()
  const [newUser, setNewUser] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    if (newUser && formData.get('password') !== formData.get('confirm-password')) {
      return setError('Passwords do not match')
    }

    const res = await (newUser ? signup : login)(formData)

    if (res.success) {
      return await router.replace('/student/dashboard')
    } else {
      console.log(res)
      setError(res.error)
    }
  }

  return (
    <main className={`h-screen w-screen flex justify-center items-center bg-zinc-900 ${inter.className}`}>
      <form onSubmit={handleSubmit}
            className="grid grid-cols-5 border-2 p-16 rounded-3xl gap-x-20 gap-y-10 shadow-md shadow-white bg-zinc-800">
        <p className="col-span-full text-5xl text-center">
          {newUser ? 'Signup' : 'Login'}
        </p>
        <div className="grid grid-cols-1 col-span-2 gap-y-4">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <label htmlFor="password" className="text-xl">
            Password
          </label>
          {newUser &&
            <>
              <label htmlFor="confirm-password" className="text-xl">
                Confirm Password
              </label>
              <label htmlFor="name" className="text-xl">
                Name
              </label>
              <label htmlFor="uid" className="text-xl">
                University ID
              </label>
              <label htmlFor="year">
                Year
              </label>
            </>
          }
        </div>
        <div className="grid grid-cols-1 col-span-3 gap-y-4 text-black min-w-96">
          <input type="email" name="email" id="email" className="rounded-md p-2" placeholder="HBKU Email..."/>
          <input type="password" name="password" id="password" className="rounded-md p-2"
                 placeholder="Your password...."/>
          {
            newUser &&
            <>
              <input type="password" name="confirm-password" id="confirm-password" className="rounded-md p-2"
                     placeholder="Confirm password..."/>
              <input type="text" name="name" id="name" className="rounded-md p-2" placeholder="Your name..."/>
              <input type="number" name="uid" id="uid" className="rounded-md p-2" placeholder="University ID..."/>
              <select name="year" id="year" className="rounded-md p-2">
                <option value="1">Freshman</option>
                <option value="2">Sophomore</option>
                <option value="3">Junior</option>
                <option value="4">Senior</option>
              </select>
            </>
          }
        </div>
        <div className="grid grid-cols-2">
          <button
            type="submit"
            className="col-span-5 bg-blue-500 text-white rounded-md p-2 text-xl font-bold hover:bg-blue-700">
            Submit
          </button>
          <button
            type="button"
            onClick={() => setNewUser(!newUser)}
            className="col-span-5 bg-green-500 text-white rounded-md p-2 text-xl font-bold hover:bg-blue-700">
            {newUser ? 'Login' : 'Signup'}
          </button>
        </div>

        {error &&
          <div className="relative bg-red-500 col-span-5 rounded">
            <button className="absolute top-0 right-2">
              x
            </button>
            <p className="font-bold text-white p-2 mt-4">
              {error}
            </p>
          </div>
        }
      </form>
    </main>
  )
}

export default AuthGuard(LoginPage, true)