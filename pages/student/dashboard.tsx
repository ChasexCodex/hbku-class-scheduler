import Link from "next/link";
import {logout} from "@/utils/auth";
import AuthGuard from "@/components/AuthGuard";
import {useAuth} from "@/hooks/AuthContext";


function StudentDashboard() {
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
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Logout</button>
      </form>
      <Link href="/student/details">Details</Link>
      <p>{user.displayName}</p>
    </div>
  )
}

export default AuthGuard(StudentDashboard)