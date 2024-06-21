import {getStudentData} from "@/utils/students";
import requireAuth from "@/components/RequireAuth";
import {useEffect, useState} from "react";

function Details() {
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
    <div>
      <h1>Student Details</h1>
      {JSON.stringify(studentData)}
    </div>
  )
}

export default requireAuth(Details, '/student/login')