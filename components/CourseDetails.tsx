import {getHBKUCourseDetails, getTexasCourseDetails} from "@/utils/students";
import {HBKUCourseType, SWVEntry} from "@/types";

type Props = {
  hoveredCell?: string,
  howdy: SWVEntry[],
  hbkuCourses: HBKUCourseType[]
}

const CourseDetails = ({hoveredCell, howdy, hbkuCourses}: Props) => {
  if (!hoveredCell) return

  const details = getTexasCourseDetails(hoveredCell, howdy) || getHBKUCourseDetails(hoveredCell, hbkuCourses)

  if (!details) {
    console.log('Course not found', hoveredCell)
    return
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Course Details</h2>
      <p>Name: <span>{details.name}</span></p>
      {'section' in details && <p>Section: <span>{details.section}</span></p>}
      <p>Title: <span>{details.title}</span></p>
      <p>CRN: <span>{hoveredCell}</span></p>
    </div>
  )
}

export default CourseDetails