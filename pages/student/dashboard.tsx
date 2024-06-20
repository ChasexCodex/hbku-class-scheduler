import {getUser, logout} from "@/utils/auth";
import {useRouter} from "next/router";
import RequireAuth from "@/components/RequireAuth";

export default function StudentDashboard() {
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const res = await logout();
      if (res.success) {
        return router.replace('/student/login')
      }
    } catch (e) {
      console.log(e)
    }

    console.log('Failed to logout')
  }

  return (
    <RequireAuth redirectRoute={'/student/login'}>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Logout</button>
        </form>
        {getUser()?.displayName}
      </div>
    </RequireAuth>
  )
}