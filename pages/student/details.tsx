import {getStudentData} from "@/utils/students";
import {useEffect, useState} from "react";
import AuthRedirect from "@/components/AuthRedirect";
import {useAuth} from "@/hooks/AuthContext";

export default function Details() {
  const {user} = useAuth()
  const [studentData, setStudentData] = useState<object | undefined>()

  useEffect(() => {
    if (!user) return

    getStudentData(user)
      .then(e => {
        if (e) {
          setStudentData(e)
        }
      })
  }, [user])

  return (
    <AuthRedirect>
      <div>
        <h1>Student Details</h1>
        {JSON.stringify(studentData)}
      </div>
    </AuthRedirect>
  )
}
