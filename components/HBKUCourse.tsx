import {HBKUCourseType} from '@/types'

type Props = {
  initialData: HBKUCourseType
  remove: () => void
}

const HBKUCourse = ({initialData: {crn, title, name, instructor}, remove}: Props) => {
  return (
    <div className="grid grid-cols-2 border p-1 rounded-md">
      <label htmlFor="crn[]">CRN</label>
      <input type="text" name="crn[]" defaultValue={crn}/>
      <label htmlFor="crn[]">Title</label>
      <input type="text" name="title[]" defaultValue={title}/>
      <label htmlFor="crn[]">Name</label>
      <input type="text" name="name[]" defaultValue={name}/>
      <label htmlFor="crn[]">Instructors</label>
      <input type="text" name="instructor[]" defaultValue={instructor}/>
      <button type="button" onClick={remove}>Remove</button>
    </div>
  )
}

export default HBKUCourse