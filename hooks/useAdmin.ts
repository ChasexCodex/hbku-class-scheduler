import {useAuth} from "@/hooks/AuthContext";
import {useEffect, useState} from "react";

const useAdmin = () => {
  const {user, loading} = useAuth()
  const [admin, setAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (loading) return

    if (!user) {
      setAdmin(false)
      return
    }

    (async () => {
      const token = await user.data.getIdTokenResult()
      const isAdmin = !!token.claims.admin
      setAdmin(isAdmin)
    })()
  }, [loading, user]);

  return {user, admin, loading: loading || admin === null}
}

export default useAdmin