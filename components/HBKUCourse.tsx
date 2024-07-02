import {HBKUCourseType} from "@/types";

const HBKUCourse = ({data: course, remove, updateCourse}: {
  data: HBKUCourseType,
  remove: () => void,
  updateCourse: (updatedCourse: HBKUCourseType) => void
}) => {
  const handleChange = (field: keyof HBKUCourseType, value: string) => {
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

export default HBKUCourse