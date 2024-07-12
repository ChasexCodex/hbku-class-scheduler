import Link from 'next/link'
import {logout} from '@/utils/auth'
import AuthGuard from '@/components/AuthGuard'
import useAdmin from '@/hooks/useAdmin'
import UserLayout from '@/layouts/UserLayout'
import _ from 'lodash'


function StudentDashboard() {
  const {admin, loading} = useAdmin()

  const handleSubmit = async () => {
    const res = await logout()

    if (res.success) {
      console.log('Logout successful')
      return
    }

    console.log('Logout failed', res.error)
    // TODO: display error
  }

  return (
    <div className="flex-1 flex flex-col items-center py-10">
      <div className="bg-zinc-200 dark:bg-zinc-900 shadow rounded-lg p-8 mb-6 w-full max-w-md">
        <p className="text-xl font-semibold mb-4">Welcome</p>
        <div className="flex flex-col space-y-2">
          {!loading && admin &&
            <Link href="/student/table" className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded text-center w-max">
              Table
            </Link>
          }
          <button onClick={handleSubmit} type="submit"
                  className="w-max inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default _.set(AuthGuard(StudentDashboard), 'layout', UserLayout)