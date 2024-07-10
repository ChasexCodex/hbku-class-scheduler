import AdminGuard from '@/components/AdminGuard'
import useHBKUCourses from '@/hooks/useHBKUCourses'
import {HBKUCourseType} from '@/types'
import {useState} from 'react'
import HBKUCourse from '@/components/HBKUCourse'
import {submitForm, idify} from '@/utils/form'

type CourseEntry = HBKUCourseType & { id: number }

const Courses = () => {
  const {data, update} = useHBKUCourses()
  const [courses, setCourses] = useState<CourseEntry[]>(data!.map(idify))

  const handleAddCourse = () => {
    setCourses([...courses, {
      crn: '',
      title: '',
      name: '',
      instructor: [''],
      id: Math.random(),
    }])
  }

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index))
  }

  const handleSubmit = async (formData: FormData) => {
    console.log('submitting')

    const data = {
      crn: formData.getAll('crn[]') as string[],
      title: formData.getAll('title[]') as string[],
      name: formData.getAll('name[]') as string[],
      instructor: formData.getAll('instructor[]') as string[],
    }

    const courses = data.crn.map((crn, i) => ({
      crn,
      title: data.title[i],
      name: data.name[i],
      instructor: data.instructor[i].split(',').map(name => name.trim()),
    }))

    console.log('Courses being submitted:', courses)

    await update(courses)
  }

  return (
    <div>
      <form onSubmit={submitForm(handleSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {
            courses.map((course, i) => (
              <HBKUCourse key={course.id} remove={() => handleRemoveCourse(i)} initialData={course}/>
            ))
          }
        </div>
        <button onClick={handleAddCourse} type="button">Add Course</button>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default AdminGuard(Courses)