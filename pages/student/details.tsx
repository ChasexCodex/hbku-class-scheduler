import AuthGuard from "@/components/AuthGuard";
import {useAuth} from "@/hooks/AuthContext";
import useStudentData from "@/hooks/useStudentData";
import Loading from "@/components/Loading";
import CourseList from "@/components/CourseList";

function Details() {
  const {user} = useAuth()
  const {data, isLoading, error, update} = useStudentData()
  const studentData = data!

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const data = {
      name: formData.get('name'),
      year: formData.get('year'),
      uid: formData.get('uid'),
      texas_courses: formData.getAll('texas_courses[]'),
      hbku_courses: formData.getAll('hbku_courses[]'),
    }

    await update(data)
  }

  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <h1>Student Details</h1>
      {studentData && JSON.stringify(studentData)}
      <form onSubmit={handleSubmit} className="text-black">
        <input type="text" name="name" placeholder="Name" defaultValue={user.data.displayName}/>
        <select name="year" defaultValue={studentData.year}>
          <option value="1">Freshman</option>
          <option value="2">Sophomore</option>
          <option value="3">Junior</option>
          <option value="4">Senior</option>
        </select>
        <input type="number" name="uid" defaultValue={studentData.uid}/>
        <br/>

        <p className="text-white font-bold">Texas Courses</p>
        <CourseList courses={studentData.texas_courses} type="texas"/>
        <p className="text-white font-bold">HBKU Courses</p>
        <CourseList courses={studentData.hbku_courses} type="hbku"/>

        <button type="submit" className="text-white">Update</button>
      </form>
    </div>
  )
}

export default AuthGuard(Details)
