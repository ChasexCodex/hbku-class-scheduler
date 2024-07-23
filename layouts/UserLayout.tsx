import {Inter} from 'next/font/google'
import DarkModeButton from '@/components/DarkModeButton'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {PropsWithChildren} from 'react'
import _ from 'lodash'
import SWRSuspense from '@/components/SWRSuspense'
import {useAuth} from '@/hooks/AuthContext'
import Loading from '@/components/Loading'
import {routes} from '@/utils/const'

const inter = Inter({subsets: ['latin']})

const NavbarLink = ({href, children}: PropsWithChildren<{ href: string }>) => {
  const router = useRouter()

  const isActive = router.pathname === href
  const baseClasses = 'px-3 py-2 rounded-md text-sm font-medium hover:text-indigo-600'
  const activeClasses = 'font-bold border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
  const inactiveClasses = 'text-zinc-800 dark:text-zinc-200'

  return (
    <Link href={href}>
      <span className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
        {children}
      </span>
    </Link>
  )
}

function UserLayout({children}: PropsWithChildren) {
  const {user, isLoading} = useAuth()
  const router = useRouter()

  if (isLoading) {
    return <Loading/>
  }

  if (!user) {
    router.replace(routes.login)
    return
  }

  return (
    <main
      className={`min-h-screen w-screen relative ${inter.className} bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white flex flex-col`}>
      <nav className="bg-white dark:bg-zinc-900 shadow mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex">
              <NavbarLink href="/student/dashboard">
                Dashboard
              </NavbarLink>
              <NavbarLink href="/student/details">
                Details
              </NavbarLink>
            </div>
            <DarkModeButton/>
          </div>
        </div>
      </nav>
      <SWRSuspense>
        {children}
      </SWRSuspense>
    </main>
  )
}

export default UserLayout

export const setUserLayout = (Component: any) => _.set(Component, 'layout', UserLayout)