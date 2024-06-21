import {getUser, logout} from "@/utils/auth";
import {useRouter} from "next/router";
import requireAuth from "@/components/RequireAuth";
import Link from "next/link";

function StudentDashboard() {
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
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Logout</button>
        </form>
        <Link href="/student/details">Details</Link>
        <p>{getUser()?.displayName}</p>
      </div>
  )
}

export default requireAuth(StudentDashboard, '/student/login')