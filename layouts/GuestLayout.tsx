import {PropsWithChildren, useEffect} from 'react'
import {useAuth} from '@/hooks/AuthContext'
import {useRouter} from 'next/router'
import _ from 'lodash'
import {routes} from '@/utils/const'

function GuestLayout({children}: PropsWithChildren) {
  const {isLoading, user} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(routes.details)
      return
    }
  }, [isLoading, user, router])

  return <>{children}</>
}

export default GuestLayout

export const setGuestLayout = (Component: any) => _.set(Component, 'layout', GuestLayout)