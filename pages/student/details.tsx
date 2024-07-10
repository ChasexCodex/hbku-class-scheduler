import AuthGuard from '@/components/AuthGuard'
import useStudentData from '@/hooks/useStudentData'
import CourseList from '@/components/CourseList'
import {getHBKUCourseDetails, getTexasCourseDetails} from '@/utils/students'
import {currentTerm} from '@/utils/const'
import {submitForm} from '@/utils/form'
import SWRSuspense from '@/components/SWRSuspense'

function Details() {
  const {data, update} = useStudentData(currentTerm)
  const {studentData} = data

  const handleSubmit = async (formData: FormData) => {

    const data = {
      name: formData.get('name'),
      year: formData.get('year'),
      uid: formData.get('uid'),
      texas_courses: formData.getAll('texas_courses[]'),
      hbku_courses: formData.getAll('hbku_courses[]'),
    }

    await update(data)
  }

  return (
    <SWRSuspense>
      <div>
        <h1>Student Details</h1>
        <form onSubmit={submitForm(handleSubmit)} className="dark:text-white">
          <input type="text" name="name" placeholder="Name" defaultValue={studentData.name}/>
          <select name="year" defaultValue={studentData.year}>
            {['Freshman', 'Sophomore', 'Junior', 'Senior'].map((year, i) => (
              <option key={year} value={i + 1}>{year}</option>
            ))}
          </select>
          <input type="number" name="uid" defaultValue={studentData.uid}/>
          <br/>

          <p className="text-white font-bold">Texas Courses</p>
          <CourseList courseInfoCallback={(c) => getTexasCourseDetails(c, data.howdy)}
                      courses={studentData.texas_courses}
                      type="texas"/>
          <p className="text-white font-bold">HBKU Courses</p>
          <CourseList courseInfoCallback={(c) => getHBKUCourseDetails(c, data.hbkuCourses)}
                      courses={studentData.hbku_courses} type="hbku"/>

          <button type="submit" className="text-white">Update</button>
        </form>
      </div>
    </SWRSuspense>
  )
}

export default AuthGuard(Details)
