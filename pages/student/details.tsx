import {getStudentData} from "@/utils/students";
import {useEffect, useState} from "react";
import AuthGuard from "@/components/AuthGuard";
import {useAuth} from "@/hooks/AuthContext";

function Details() {
  const {user} = useAuth()
  const [studentData, setStudentData] = useState<object | undefined>()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const data = new FormData(e.target)
  }

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
      <div>
        <h1>Student Details</h1>
        {studentData && JSON.stringify(studentData)}
        <form onSubmit={handleSubmit} className="text-black">
          <input type="text" name="name" placeholder="Name" defaultValue={user.data.displayName}/>
          <select name="year" defaultValue="1">
            <option value="1">Freshman</option>
            <option value="2">Sophomore</option>
            <option value="3">Junior</option>
            <option value="4">Senior</option>
          </select>
          <button type="submit" className="text-white">Update</button>
        </form>
      </div>
  )
}

export default AuthGuard(Details)
