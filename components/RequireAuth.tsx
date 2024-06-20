import {useRouter} from "next/router";
import {PropsWithChildren, useEffect} from "react";
import {isAuthenticated} from "@/utils/auth";

type Props = PropsWithChildren<{
  redirectRoute: string
}>

export default function RequireAuth({children, redirectRoute}: Props) {
  const router = useRouter()

  useEffect(() => {
    isAuthenticated() || router.replace(redirectRoute)
  }, [router, redirectRoute])

  if (!isAuthenticated()) {
    return null
  }

  return <>{children}</>
}