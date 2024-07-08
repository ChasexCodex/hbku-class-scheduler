import AdminGuard from "@/components/AdminGuard";
import useCourses from "@/hooks/useCourses";
import Loading from "@/components/Loading";
import {getDistinctCoursesList, getLectureTimings} from "@/utils/table";
import Table from "@/components/Table";
import {useEffect, useMemo, useState} from "react";
import {getTexasCourseDetails} from "@/utils/students";
import {currentTerm} from "@/utils/const";
import {setState} from "@/utils/form";
import {SWVEntry} from "@/types";

type CourseCheckboxProps = {
  course: string
  details: any
  selected: boolean
  onChange: () => void
  howdy: SWVEntry[]
}

const CourseCheckbox = ({course, details, selected, onChange}: CourseCheckboxProps) => {
  return (details &&
    <div>
      <input type="checkbox" name={course} checked={selected} onChange={onChange}/>
      <label htmlFor={course}>{details.name} - {details.section} ({details.title})</label>
    </div>
  )
}

const TablePage = () => {
  const {data, isLoading, error} = useCourses(currentTerm);
  const [year, setYear] = useState(3)
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)
  const crns = useMemo(() => {
    if (!data || !data.studentsCourses) return []

    return getDistinctCoursesList(data.studentsCourses, year)
  }, [data, year])
  const [coursesSelection, setCoursesSelection] = useState<{ [p: string]: boolean }>({})

  useEffect(() => {
    setCoursesSelection(Object.fromEntries(crns.map(e => [e, true])))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crns.length]);


  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <div>Error: {error}</div>
  }


  const filteredCRNS = Object
    .entries(coursesSelection)
    .filter(([, on]) => on)
    .map(([e,]) => e)
    .map(e => e)
  const timings = getLectureTimings(filteredCRNS, data.howdy)

  const handleSelectionChange = (course: string) => {
    setCoursesSelection(prev => ({...prev, [course]: !prev[course]}))
  }

  const handleCellHover = (crn: string, enter: boolean) => {
    setHoveredCell(enter ? crn : null)
  }

  return (
    <div>
      <h1>Table Page</h1>
      <select value={year} onChange={setState(setYear)}>
        <option value="1">Freshmen</option>
        <option value="2">Sophomore</option>
        <option value="3">Junior</option>
        <option value="4">Senior</option>
      </select>
      <Table
        timings={timings}
        onCellHover={handleCellHover}
      />
      <div className="grid grid-cols-2">
        <div>
          {
            Object.entries(coursesSelection).map(([course, selected]) => (
              <CourseCheckbox
                key={course}
                course={course}
                selected={selected}
                details={getTexasCourseDetails(course, data.howdy)}
                onChange={() => handleSelectionChange(course)}
                howdy={data.howdy}
              />
            ))
          }
        </div>
        <div>
          {hoveredCell && (() => {
            const details = getTexasCourseDetails(hoveredCell, data.howdy)

            return (details &&
              <div>
                <h2 className="text-xl font-bold">Course Details</h2>
                <p>Name: <span>{details.name}</span></p>
                <p>Section: <span>{details.section}</span></p>
                <p>Title: <span>{details.title}</span></p>
                <p>CRN: <span>{hoveredCell}</span></p>
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  );
}

export default AdminGuard(TablePage);