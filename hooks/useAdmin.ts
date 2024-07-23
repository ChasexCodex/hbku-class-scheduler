import {useAuth} from '@/hooks/AuthContext'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {routes} from '@/utils/const'

const useAdmin = () => {
  const {isLoading, user} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user?.admin) {
      router.replace(routes.login)
    }
  }, [isLoading, user, router])

  return {isLoading, user}
}

export default useAdmin