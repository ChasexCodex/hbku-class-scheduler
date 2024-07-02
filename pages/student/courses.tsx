import AdminGuard from "@/components/AdminGuard";
import useHBKUCourses from "@/hooks/useHBKUCourses";
import Loading from "@/components/Loading";
import {HBKUCourseType} from "@/types";
import {useEffect, useState} from "react";
import HBKUCourse from "@/components/HBKUCourse";

function idify<T>(e: T) {
  return {...e, id: Math.random()}
}

const Courses = () => {
  const {data, isLoading, error, update} = useHBKUCourses();
  const [courses, setCourses] = useState(data?.map(idify) || []);

  useEffect(() => {
    if (isLoading || !data || courses.length > 0) return;

    setCourses(data.map(idify));
  }, [isLoading, data, courses.length]);

  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  const handleAddCourse = () => {
    setCourses([...courses, {
      crn: '',
      title: '',
      name: '',
      instructor: [''],
      id: Math.random()
    }])
  }

  const updateCourse = (index: number, updatedCourse: HBKUCourseType & { id: number }) => {
    setCourses(courses.map((course, i) => i === index ? updatedCourse : course));
  }

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    console.log('submitting')

    const formData = new FormData(e.target)

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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {
            courses.map((course, i) => (
              <HBKUCourse key={course.id} remove={() => handleRemoveCourse(i)}
                      updateCourse={(updatedCourse) => updateCourse(i, {...updatedCourse, id: course.id})}
                      data={course}/>
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