import AuthGuard from '@/components/AuthGuard'
import useStudentData from '@/hooks/useStudentData'
import CourseList from '@/components/CourseList'
import {getHBKUCourseDetails, getTexasCourseDetails} from '@/utils/students'
import {currentTerm} from '@/utils/const'
import {checkNumeric, submitForm} from '@/utils/form'
import SWRSuspense from '@/components/SWRSuspense'
import {setUserLayout} from '@/layouts/UserLayout'

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
      <div className="p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Student Details</h1>
        <form onSubmit={submitForm(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-w-xl">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-100">Name</label>
            <input type="text" name="name" id="name" placeholder="Name" defaultValue={studentData.name}
                   className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <label htmlFor="year" className="block text-sm font-medium text-zinc-700 dark:text-zinc-100">Academic Year</label>
            <select name="year" id="year" defaultValue={studentData.year}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {['Freshman', 'Sophomore', 'Junior', 'Senior'].map((year, i) => (
                <option key={year} value={i + 1}>{year}</option>
              ))}
            </select>

            <label htmlFor="uid" className="block text-sm font-medium text-zinc-700 dark:text-zinc-100">University ID</label>
            <input type="text" onKeyDown={checkNumeric} name="uid" id="uid" defaultValue={studentData.uid}
                   className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <br/>

          <h1 className="text-3xl font-bold mb-2">Texas Courses</h1>
          <CourseList courseInfoCallback={(c) => getTexasCourseDetails(c, data.howdy)}
                      courses={studentData.texas_courses}
                      type="texas"/>
          <h1 className="text-3xl font-bold mb-2">HBKU Courses</h1>
          <CourseList courseInfoCallback={(c) => getHBKUCourseDetails(c, data.hbkuCourses)}
                      courses={studentData.hbku_courses} type="hbku"/>

          <button type="submit"
                  className="w-full p-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 max-w-max">
            Update
          </button>
        </form>
      </div>
    </SWRSuspense>
  )
}

export default setUserLayout(AuthGuard(Details))