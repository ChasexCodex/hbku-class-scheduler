import Link from 'next/link'
import {logout} from '@/utils/auth'
import {setUserLayout} from '@/layouts/UserLayout'
import {useState} from 'react'
import Head from 'next/head'
import {useUser} from '@/hooks/AuthContext'

function StudentDashboard() {
  const user = useUser()
  const [error, setError] = useState('')

  const handleSubmit = () => {
    logout()
      .catch((error) => {
        console.log('Logout failed', error)
        setError('Logout failed. Please try again.')
      })
  }

  return (
    <div className="flex-1 flex flex-col items-center py-10">
      <Head>
        <title>HBKU Class Scheduler - Dashboard</title>
      </Head>
      <div className="bg-zinc-200 dark:bg-zinc-900 shadow rounded-lg p-8 mb-6 w-full max-w-md">
        <p className="text-xl font-semibold mb-4">Welcome</p>
        <div className="flex flex-row justify-between">
          {user.admin &&
            <>
              <Link href="/student/table"
                    className="block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded text-center w-max">
                Table
              </Link>
              <Link href="/student/admin"
                    className="block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded text-center w-max">
                Admin
              </Link>
            </>
          }
          <Link href="/student/details"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded text-center w-max">
            Details
          </Link>
          <button onClick={handleSubmit} type="submit"
                  className="w-max inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Logout
          </button>
          {error && (
            <div className="mt-4 p-4 border border-red-500 rounded-md bg-red-50 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default setUserLayout(StudentDashboard)