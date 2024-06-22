import {PropsWithChildren, useEffect} from "react";
import {useAuth} from "@/hooks/AuthContext";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";

const loginRoute = '/student/login'
const dashboardRoute = '/student/dashboard'

type Props = PropsWithChildren<{
  optionalAuth?: boolean
}>

export default function AuthRedirect({children, optionalAuth}: Props) {
  const {user, loading} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!optionalAuth && !user.data) {
      router.push(loginRoute)
      return
    }

    if (optionalAuth && user.data) {
      router.push(dashboardRoute)
      return
    }

  }, [loading, optionalAuth, user, router]);

  return loading ? <Loading/> : <>{children}</>
}