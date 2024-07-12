import {useArrayState} from '@/hooks/state'
import {checkNumeric} from '@/utils/form'
import _ from 'lodash'

type Props = {
  courses: string[]
  type: string
  courseInfoCallback: (crn: string) => {
    name: string
    title: string
    section?: string
    instructor: string | string[]
  } | undefined
}

const CourseDetails = ({courseInfoCallback, crn}: { courseInfoCallback: Props['courseInfoCallback'], crn: string }) => {
  const courseInfo = courseInfoCallback(crn)

  if (!courseInfo) return (
    <p className="h-full mb-[5.5rem]">Invalid CRN</p>
  )

  return (
    <div className="col-span-full p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
      {Object.entries(courseInfo).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center py-1">
          <span className="font-semibold text-gray-700 dark:text-gray-200">{_.capitalize(key)}</span>
          <span className="text-gray-600 dark:text-gray-400">{Array.isArray(value) ? _.join(value, ', ') : value}</span>
        </div>
      ))}
    </div>
  )

}

const CourseList = ({courses: data, courseInfoCallback, type}: Props) => {
  const {value: courses, add, remove, update} = useArrayState(data || [])

  return (
    <div className="p-4 bg-white shadow-md rounded-lg dark:bg-zinc-800 max-w-5xl xl:max-w-screen-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((course, i) => (
          <div key={i} className="grid grid-cols-6 gap-2 bg-zinc-100 dark:bg-zinc-700 p-2 rounded-md">
            <input
              type="text"
              onKeyDown={checkNumeric}
              name={`${type}_courses[]`}
              value={course}
              onChange={(e) => update(e.target.value, i)}
              placeholder="CRN..."
              className="w-full p-2 col-span-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
            />
            <div className="col-span-3"/>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-center py-2 offset bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
            >
              Remove
            </button>
            <div className="col-span-full p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <CourseDetails courseInfoCallback={courseInfoCallback} crn={course}/>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => add('')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
      >
        Add Course
      </button>
    </div>
  )
}

export default CourseList