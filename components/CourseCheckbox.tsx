type Props = {
  course: string
  details: any
  selected: boolean
  onChange: () => void
}

const CourseCheckbox = ({course, details, selected, onChange}: Props) => {
  return (details &&
    <div>
      <input type="checkbox" name={course} checked={selected} onChange={onChange}/>
      <label htmlFor={course}>{details.name} - {details.section} ({details.title})</label>
    </div>
  )
}

export default CourseCheckbox;