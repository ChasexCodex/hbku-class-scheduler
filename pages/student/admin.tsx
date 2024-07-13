import {handle, idify, submitForm} from '@/utils/form'
import {load, save} from '@/utils/storage'
import {useArrayState} from '@/hooks/state'
import {useEffect} from 'react'
import HBKUCourse from '@/components/HBKUCourse'
import useHBKUCourses from '@/hooks/useHBKUCourses'
import {HBKUCourseType} from '@/types'
import {setUserLayout} from '@/layouts/UserLayout'
import Head from 'next/head'

type CourseEntry = HBKUCourseType & { id: number }

const AdminPage = () => {
  const {data, update} = useHBKUCourses()
  const courses = useArrayState<CourseEntry>()
  const texasCores = useArrayState<string>()

  useEffect(() => {
    texasCores.setValue(load('cores', []))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    courses.setValue(data!.map(idify))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddCourse = () => {
    courses.add({
      crn: '',
      title: '',
      name: '',
      instructor: [''],
      id: Math.random(),
    })
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

  const updateSave = (index: number) => (value: string) => {
    save('cores', texasCores.update(value, index))
  }

  const handleRemove = (index: number) => () => {
    save('cores', texasCores.remove(index))
  }

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>HBKU Class Scheduler - Admin</title>
      </Head>
      <form onSubmit={submitForm(handleSubmit)} className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          HBKU Courses
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {courses.value.map((course, i) => (
            <HBKUCourse key={course.id} remove={() => courses.remove(i)} initialData={course}/>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={handleAddCourse} type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Add Course
          </button>
          <button type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Update
          </button>
        </div>
      </form>
      <form onSubmit={submitForm()} className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Texas Cores
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {texasCores.value.map((core, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="text" defaultValue={core} onChange={handle(updateSave(i))}
                     className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-gray-600 dark:text-white"/>
              <button onClick={handleRemove(i)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Remove
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => texasCores.add('')}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Add Core
        </button>
      </form>
    </div>
  )
}

export default setUserLayout(AdminPage)
