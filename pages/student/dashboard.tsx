import Link from "next/link";
import {logout} from "@/utils/auth";
import AuthRedirect from "@/components/AuthRedirect";
import {useAuth} from "@/hooks/AuthContext";


export default function StudentDashboard() {
  const {user} = useAuth()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await logout()

    if (res.success) {
      console.log('Logout successful')
      return
    }

    console.log('Logout failed', res.error)
    // TODO: display error
  }

  return (
    <AuthRedirect>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Logout</button>
        </form>
        <Link href="/student/details">Details</Link>
        <p>{user.displayName}</p>
      </div>
    </AuthRedirect>
  )
}