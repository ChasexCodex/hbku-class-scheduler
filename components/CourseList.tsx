import {useState} from "react";

type Props = {
  courses: string[]
  type: string
  courseInfoCallback: (crn: string) => {
    name: string
    title: string
    section?: string
    instructor: string
  } | undefined
}

const CourseList = ({courses: data, courseInfoCallback, type}: Props) => {
  const [courses, setCourses] = useState(data || []);

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
              name={`${type}_courses[]`}
              value={course}
              onChange={(e) => handleChangeCourse(i, e.target.value)}
              className="dark:text-white"
            />
            <button className="text-white" type="button" onClick={() => handleRemoveCourse(i)}>
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
      <button type="button" onClick={handleAddCourse}
              className="text-white">
        Add Course
      </button>
    </div>
  );
};

export default CourseList;