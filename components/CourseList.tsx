import {useArrayState} from '@/hooks/state'

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

const CourseList = ({courses: data, courseInfoCallback, type}: Props) => {
  const {value: courses, add, remove, update} = useArrayState(data || [])

  return (
    <div>
      <div className="grid grid-cols-1">
        {courses.map((course, i) => (
          <div key={i}>
            <input
              type="text"
              name={`${type}_courses[]`}
              value={course}
              onChange={(e) => update(e.target.value, i)}
              className="dark:text-white"
            />
            <button className="text-white" type="button" onClick={() => remove(i)}>
              Remove
            </button>
            <div className="text-white">
              {Object.entries(courseInfoCallback(course) || {'': 'Incorrect CRN'}).map(([key, value]) => (
                <div key={key}>
                  <span>{key}: </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => add('')}
              className="text-white">
        Add Course
      </button>
    </div>
  )
}

export default CourseList