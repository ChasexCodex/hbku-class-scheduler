import AuthGuard from "@/components/AuthGuard";
import useStudentData from "@/hooks/useStudentData";
import Loading from "@/components/Loading";
import CourseList from "@/components/CourseList";
import {getHBKUCourseDetails, getTexasCourseDetails} from "@/utils/students";
import {currentTerm} from "@/utils/const";

function Details() {
  const {data, isLoading, error, update} = useStudentData(currentTerm)
  const {studentData} = data

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
      <form onSubmit={handleSubmit} className="dark:text-white">
        <input type="text" name="name" placeholder="Name" defaultValue={studentData.name}/>
        <select name="year" defaultValue={studentData.year}>
          <option value="1">Freshman</option>
          <option value="2">Sophomore</option>
          <option value="3">Junior</option>
          <option value="4">Senior</option>
        </select>
        <input type="number" name="uid" defaultValue={studentData.uid}/>
        <br/>

        <p className="text-white font-bold">Texas Courses</p>
        <CourseList courseInfoCallback={(c) => getTexasCourseDetails(c, data.howdy)} courses={studentData.texas_courses} type="texas"/>
        <p className="text-white font-bold">HBKU Courses</p>
        <CourseList courseInfoCallback={(c) => getHBKUCourseDetails(c, data.hbkuCourses)} courses={studentData.hbku_courses} type="hbku"/>

        <button type="submit" className="text-white">Update</button>
      </form>
    </div>
  )
}

export default AuthGuard(Details)
