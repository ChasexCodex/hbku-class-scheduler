import {HBKUCourseType} from '@/types'

type Props = {
  initialData: HBKUCourseType
  remove: () => void
}

const HBKUCourse = ({initialData: {crn, title, name, instructor}, remove}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 shadow-lg bg-zinc-200 dark:bg-zinc-700 rounded-lg">
      <label htmlFor="crn[]" className="font-semibold">CRN</label>
      <input type="text" name="crn[]" defaultValue={crn}
             className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-gray-600 dark:text-white"/>

      <label htmlFor="title[]" className="font-semibold">Title</label>
      <input type="text" name="title[]" defaultValue={title}
             className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-gray-600 dark:text-white"/>

      <label htmlFor="name[]" className="font-semibold">Name</label>
      <input type="text" name="name[]" defaultValue={name}
             className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-gray-600 dark:text-white"/>

      <label htmlFor="instructor[]" className="font-semibold">Instructors</label>
      <input type="text" name="instructor[]" defaultValue={instructor}
             className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-gray-600 dark:text-white"/>

      <button type="button" onClick={remove}
              className="col-span-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-max">
        Remove
      </button>
    </div>
  )
}

export default HBKUCourse