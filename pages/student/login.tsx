import {Inter} from 'next/font/google'
import {useState} from 'react'
import {useRouter} from 'next/router'
import {login, sendVerificationEmail, signup} from '@/utils/auth'
import AuthGuard from '@/components/AuthGuard'
import {years} from '@/utils/const'
import {checkNumeric, submitForm} from '@/utils/form'
import DarkModeButton from '@/components/DarkModeButton'
import Head from 'next/head'

const inter = Inter({subsets: ['latin']})

function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>()
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [newUser, setNewUser] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    // assert emails are hbku emails
    if (!formData.get('email')?.toString().endsWith('@hbku.edu.qa')) {
      return setError('Please use your HBKU email')
    }

    if (newUser && formData.get('password') !== formData.get('confirm-password')) {
      return setError('Passwords do not match')
    }

    const res = await (newUser ? signup : login)(formData)

    if (res.success) {
      if (newUser) {
        const res2 = await sendVerificationEmail((res.data as any).createUserResponse.user)
        if (!res2.success) {
          setError(res2.error)
          return
        }
        setMessage('Verification email sent. Please verify your email then log in.')
        return
      }
      await router.replace('/student/dashboard')
      return
    }

    console.log(res)
    setError(res.error)
  }

  return (
    <main className={`${inter.className} min-h-screen bg-gray-100 dark:bg-zinc-950 flex justify-center items-center`}>
      <Head>
        <title>HBKU Class Scheduler - Login</title>
      </Head>
      <form onSubmit={submitForm(handleSubmit)}
            className="mx-auto min-w-96 max-w-4xl p-4 space-y-6 border-2 border-black dark:border-white rounded-lg shadow-xl dark:shadow-zinc-700">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300">
            {newUser ? 'Signup' : 'Login'}
          </h2>
          <DarkModeButton/>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" name="email" id="email"
                   className="login-input"
                   placeholder="HBKU Email..."/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" name="password" id="password"
                   className="login-input"
                   placeholder="Your password..."/>
          </div>
          {newUser && (
            <>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input type="password" name="confirm-password" className="login-input"
                       placeholder="Confirm password..."/>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input type="text" name="name" className="login-input"
                       placeholder="Your name..."/>
              </div>
              <div>
                <label htmlFor="uid" className="block text-sm font-medium text-gray-700">
                  University ID
                </label>
                <input type="text" name="uid" className="login-input" placeholder="University ID..."
                       onKeyDown={checkNumeric}/>
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <select name="year" className="login-input">
                  {years.map((e, i) => (
                    <option key={e} value={`${i}`}>{e}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setNewUser(!newUser)}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {newUser ? 'Login?' : 'Signup?'}
          </button>
          <button type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>

        {error && (
          <div className="relative mt-4 p-4 border border-red-500 rounded-md bg-red-50">
            <button className="absolute top-0 right-0 mt-2 mr-2" onClick={() => setError(undefined)}>
              x
            </button>
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}
        {message && (
          <div className="relative mt-4 p-4 border border-green-500 rounded-md bg-green-50">
            <button className="absolute top-0 right-0 mt-2 mr-2" onClick={() => setError(undefined)}>
              x
            </button>
            <p className="text-sm text-green-700">
              {message}
            </p>
          </div>
        )}
      </form>
    </main>
  )
}

export default AuthGuard(LoginPage, true)