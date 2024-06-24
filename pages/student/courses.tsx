import AdminGuard from "@/components/AdminGuard";
import useHBKUCourses from "@/hooks/useHBKUCourses";
import Loading from "@/components/Loading";
import {HBKUCourse} from "@/types";
import {useEffect, useState} from "react";

const Course = ({data: course, remove, updateCourse}: {
  data: HBKUCourse,
  remove: () => void,
  updateCourse: (updatedCourse: HBKUCourse) => void
}) => {
  const handleChange = (field: keyof HBKUCourse, value: string) => {
    updateCourse({
      ...course,
      [field]: value,
    });
  };

  return (
    <div className="grid grid-cols-2 border p-1 rounded-md">
      <label htmlFor="crn[]">CRN</label>
      <input type="text" name="crn[]" value={course.crn} onChange={(e) => handleChange('crn', e.target.value)}/>
      <label htmlFor="crn[]">Title</label>
      <input type="text" name="title[]" value={course.title} onChange={(e) => handleChange('title', e.target.value)}/>
      <label htmlFor="crn[]">Name</label>
      <input type="text" name="name[]" value={course.name} onChange={(e) => handleChange('name', e.target.value)}/>
      <label htmlFor="crn[]">Instructors</label>
      <input type="text" name="instructor[]" value={course.instructor}
             onChange={(e) => handleChange('instructor', e.target.value)}/>
      <button type="button" onClick={remove}>Remove</button>
    </div>
  )
}

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

  const updateCourse = (index: number, updatedCourse: HBKUCourse & { id: number }) => {
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
              <Course key={course.id} remove={() => handleRemoveCourse(i)}
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