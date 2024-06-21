import {useRouter} from "next/router";
import {PropsWithChildren, useEffect} from "react";
import {isAuthenticated} from "@/utils/auth";

type Props = PropsWithChildren<{
  redirectRoute: string
}>

function RedirectIfAuth({children, redirectRoute}: Props) {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      console.log('redirecting to ', redirectRoute)
      router.replace(redirectRoute)
    }
  }, [router, redirectRoute])

  if (isAuthenticated()) {
    return null
  }

  return <>{children}</>
}

export default function redirectIfAuth(Component: any, redirectRoute: string) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    return (
      <RedirectIfAuth redirectRoute={redirectRoute}>
        <Component {...props} />
      </RedirectIfAuth>
    )
  }
}