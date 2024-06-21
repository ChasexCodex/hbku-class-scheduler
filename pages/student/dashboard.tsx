import {getUser, logout} from "@/utils/auth";
import {useRouter} from "next/router";
import AuthRedirect from "@/components/AuthRedirect";
import Link from "next/link";

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
    <AuthRedirect>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Logout</button>
        </form>
        <Link href="/student/details">Details</Link>
        <p>{getUser()?.displayName}</p>
      </div>
    </AuthRedirect>
  )
}