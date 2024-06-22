import {ComponentType, useEffect, useState} from "react";
import {useAuth} from "@/hooks/AuthContext";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import AuthGuard from "@/components/AuthGuard";

const dashboardRoute = '/student/dashboard'

const AdminGuard = (WrappedComponent: ComponentType) => {
  // eslint-disable-next-line react/display-name
  return AuthGuard(
    (props: any) => {
      /* eslint-disable react-hooks/rules-of-hooks */
      const {user, loading} = useAuth()
      const [admin, setAdmin] = useState<boolean | null>(null)
      const router = useRouter()

      useEffect(() => {
        if (loading) return

        (async () => {
          const token = await user.data.getIdTokenResult()
          const isAdmin = !!token.claims.admin
          if (!isAdmin) {
            await router.push(dashboardRoute)
          }

          setAdmin(isAdmin)
        })()
      }, [loading, user, router]);

      return (loading || admin === null) ? <Loading/> : <WrappedComponent {...props}/>
    })
}


export default AdminGuard;