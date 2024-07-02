import AdminGuard from "@/components/AdminGuard";
import useCourses from "@/hooks/useCourses";
import Loading from "@/components/Loading";
import {getDistinctCoursesList, getLectureTimings} from "@/utils/table";
import Table from "@/components/Table";
import {useEffect, useMemo, useState} from "react";
import {getTexasCourseDetails} from "@/utils/students";

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  // 'Friday',
  // 'Saturday',
]

const TablePage = () => {
  const {data, isLoading, error} = useCourses('202433');
  const crns = useMemo(() => {
    if (!data || !data.studentsCourses) return []

    return getDistinctCoursesList(data.studentsCourses)
  }, [data])
  const [coursesSelection, setCoursesSelection] = useState<{ [p: string]: boolean }>({})

  useEffect(() => {
    setCoursesSelection(Object.fromEntries(crns.map(e => [e, true])))
  }, [crns.length]);


  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <div>Error: {error}</div>
  }


  const filteredCRNS = Object.entries(coursesSelection).filter(([,on]) => on).map(([e, ]) => e)
  const timings = getLectureTimings(filteredCRNS, data.howdy)

  const handleSelectionChange = (course: string) => {
    setCoursesSelection(prev => ({...prev, [course]: !prev[course]}))
  }

  return (
    <div>
      <h1>Table Page</h1>
      <Table days={days} timings={timings}/>
      <form>
        {
          Object.entries(coursesSelection).map(([course, selected]) => {
            const details = getTexasCourseDetails(course, data.howdy)

            return (details &&
              <div key={course}>
                <input type="checkbox" name={course} checked={selected} onChange={() => handleSelectionChange(course)}/>
                <label htmlFor={course}>{details.name} - {details.section} ({details.title})</label>
              </div>
            )
          })
        }
        {/*<p>*/}
        {/*  {JSON.stringify(data.studentsCourses)}*/}
        {/*</p>*/}
      </form>
    </div>
  );
}

export default AdminGuard(TablePage);