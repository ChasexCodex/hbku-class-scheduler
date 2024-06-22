import {useState} from "react";
import {StudentData} from "@/types";

type Props = {
  data: StudentData
}

const CourseList = ({data}: Props) => {
  const [courses, setCourses] = useState(data.courses || []);

  const handleAddCourse = () => {
    setCourses([...courses, '']);
  };

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleChangeCourse = (index: number, value: string) => {
    const newCourses = courses.slice();
    newCourses[index] = value;
    setCourses(newCourses);
  };

  return (
    <div>
      <div className="grid grid-cols-1">
        {courses.map((course, i) => (
          <div key={i}>
            <input
              type="text"
              name="courses[]"
              value={course}
              onChange={(e) => handleChangeCourse(i, e.target.value)}
            />
            <button className="text-white" type="button" onClick={() => handleRemoveCourse(i)}>
              Remove
            </button>
            <div className="text-white">
              {course}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={handleAddCourse}
              className="text-white">
        Add Course
      </button>
    </div>
  );
};

export default CourseList;