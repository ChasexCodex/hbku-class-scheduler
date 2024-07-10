import {getTexasCourseDetails} from "@/utils/students";
import {SWVEntry} from "@/types";

type Props = {
  hoveredCell?: string
  howdy: SWVEntry[]
}

const CourseDetails = ({hoveredCell, howdy}: Props) => {
  if (!hoveredCell) return

  const details = getTexasCourseDetails(hoveredCell, howdy)

  if (!details) {
    console.log('Course not found', hoveredCell)
    return
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Course Details</h2>
      <p>Name: <span>{details.name}</span></p>
      <p>Section: <span>{details.section}</span></p>
      <p>Title: <span>{details.title}</span></p>
      <p>CRN: <span>{hoveredCell}</span></p>
    </div>
  )
}

export default CourseDetails