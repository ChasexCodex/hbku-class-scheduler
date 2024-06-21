import {getStudentData} from "@/utils/students";
import {useEffect, useState} from "react";
import AuthRedirect from "@/components/AuthRedirect";

export default function Details() {
  const [studentData, setStudentData] = useState<object | undefined>()

  useEffect(() => {
    getStudentData()
      .then(e => {
        if (e) {
          setStudentData(e)
        }
      })
  }, [])

  return (
    <AuthRedirect>
      <div>
        <h1>Student Details</h1>
        {JSON.stringify(studentData)}
      </div>
    </AuthRedirect>
  )
}
