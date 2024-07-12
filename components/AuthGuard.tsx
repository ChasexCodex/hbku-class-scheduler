import {ComponentType, useEffect} from 'react'
import {useAuth} from '@/hooks/AuthContext'
import {useRouter} from 'next/router'
import Loading from '@/components/Loading'

const loginRoute = '/student/login'
const dashboardRoute = '/student/dashboard'

const AuthGuard = (WrappedComponent: ComponentType, optionalAuth?: boolean) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const {user, loading} = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (loading) return

      if (!optionalAuth && !user.data?.emailVerified) {
        router.push(loginRoute)
        return
      }

      if (optionalAuth && user.data?.emailVerified) {
        router.push(dashboardRoute)
        return
      }

    }, [loading, user, router])

    return loading ? <Loading/> : <WrappedComponent {...props}/>
  }
}


export default AuthGuard