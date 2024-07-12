import {getHBKUCourseDetails, getTexasCourseDetails} from '@/utils/students'
import {HBKUCourseType, SWVEntry} from '@/types'

type Props = {
  hoveredCell?: string,
  howdy: SWVEntry[],
  hbkuCourses: HBKUCourseType[]
}

const CourseDetails = ({hoveredCell, howdy, hbkuCourses}: Props) => {
  if (!hoveredCell) return null

  const details = getTexasCourseDetails(hoveredCell, howdy) || getHBKUCourseDetails(hoveredCell, hbkuCourses)

  if (!details) {
    console.log('Course not found', hoveredCell)
    return null
  }

  return (
    <div className="p-4 border-2 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Course Details</h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">Name: <span className="font-medium">{details.name}</span></p>
      {'section' in details && <p className="text-gray-700 dark:text-gray-300">Section: <span className="font-medium">{details.section}</span></p>}
      <p className="text-gray-700 dark:text-gray-300">Title: <span className="font-medium">{details.title}</span></p>
      <p className="text-gray-700 dark:text-gray-300">CRN: <span className="font-medium">{hoveredCell}</span></p>
    </div>
  )
}

export default CourseDetails
