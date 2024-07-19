import {useAuth} from "@/hooks/AuthContext";
import {useEffect, useState} from "react";

const useAdmin = () => {
  const {user, loading} = useAuth()
  const [admin, setAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (loading) return

    if (!user.data) {
      setAdmin(false)
      return
    }

    user.data.getIdTokenResult()
      .then((token: any) => {
        const isAdmin = !!token.claims.admin
        setAdmin(isAdmin)
      })
      .catch((e: Error) => {
        console.log(e)
        setAdmin(false)
      })
  }, [loading, user]);

  return {user, admin, loading: loading || admin === null}
}

export default useAdmin