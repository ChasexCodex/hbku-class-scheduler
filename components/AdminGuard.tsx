import {ComponentType, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import AuthGuard from "@/components/AuthGuard";
import useAdmin from "@/hooks/useAdmin";

const dashboardRoute = '/student/dashboard'

const AdminGuard = (WrappedComponent: ComponentType) => {
  // eslint-disable-next-line react/display-name
  return AuthGuard(
    (props: any) => {
      /* eslint-disable react-hooks/rules-of-hooks */
      const {admin, loading} = useAdmin()
      const router = useRouter()

      useEffect(() => {
        if (loading) return

        if (!admin) {
          router.push(dashboardRoute)
        }

      }, [loading, admin, router]);

      return loading ? <Loading/> : <WrappedComponent {...props}/>
    })
}


export default AdminGuard;