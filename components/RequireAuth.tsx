import {useRouter} from "next/router";
import {PropsWithChildren, useEffect} from "react";
import {isAuthenticated} from "@/utils/auth";

type Props = PropsWithChildren<{
  redirectRoute: string
}>

function RequireAuth({children, redirectRoute}: Props) {
  const router = useRouter()

  useEffect(() => {
    isAuthenticated() || router.replace(redirectRoute)
  }, [router, redirectRoute])

  if (!isAuthenticated()) {
    return null
  }

  return <>{children}</>
}

export default function requireAuth(Component: any, redirectRoute: string) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    return (
      <RequireAuth redirectRoute={redirectRoute}>
        <Component {...props} />
      </RequireAuth>
    )
  }
}