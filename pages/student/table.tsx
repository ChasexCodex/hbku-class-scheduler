import AdminGuard from "@/components/AdminGuard";
import useCourses from "@/hooks/useCourses";
import Loading from "@/components/Loading";
import {getDistinctCoursesList, getLectureTimings} from "@/utils/table";
import Table from "@/components/Table";
import {useEffect, useState} from "react";
import {getHBKUCourseDetails, getTexasCourseDetails} from "@/utils/students";
import {currentTerm, years} from "@/utils/const";
import {setState} from "@/utils/form";
import CourseCheckbox from "@/components/CourseCheckbox";
import CourseDetails from "@/components/CourseDetails";
import {useArrayState, useObjectState} from "@/hooks/state";
import {load, save} from "@/utils/storage";
import {HBKUCourseType} from "@/types";
import _ from "lodash";

type HBKUTimings = {
  start: string
  end: string
  day: number
}

type HBKUTimingsState = {
  [key: string]: HBKUTimings[]
}

const TablePage = () => {
  const {data, isLoading, error} = useCourses(currentTerm);
  const [year, setYear] = useState(3)
  const [hoveredCell, setHoveredCell] = useState<string>()
  const hbkuTimings = useObjectState<HBKUTimingsState>({})

  const crns = (data && data.studentsCourses) ? getDistinctCoursesList(data.studentsCourses, year) : []
  const coursesSelection = useArrayState(crns)

  useEffect(() => {
    if (isLoading) return

    const savedTimings = load<HBKUTimingsState>('hbkuTimings', {})
    const s = data.hbkuCourses.flatMap((e: HBKUCourseType) => e.crn)
    const timings = Object.fromEntries(s.map((e: string) => [e, savedTimings[e] || []]))
    hbkuTimings.setValue(timings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);


  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  const timings = getLectureTimings(coursesSelection.value, data.howdy)

  const hbkuCRNS = data.studentsCourses.flatMap((e: any) => e.hbku_courses)

  const handleSelectionChange = (course: string) => {
    if (coursesSelection.value.includes(course)) {
      const index = coursesSelection.value.indexOf(course)
      coursesSelection.remove(index)
    } else {
      coursesSelection.add(course)
    }
  }

  const handleCellHover = (crn: string, enter: boolean) => {
    setHoveredCell(enter ? crn : undefined)
  }

  function handleHBKUTimingsChange<K extends keyof HBKUTimings>(crn: string, index: number, key: K, value: HBKUTimings[K]) {
    const timings = _.cloneDeep(hbkuTimings.value[crn])
    timings[index][key] = value
    hbkuTimings.updateField(crn, timings, (newState) => save<HBKUTimingsState>('hbkuTimings', newState))
  }

  const handleAddHBKUTiming = (crn: string) => () => {
    const timings = _.concat(hbkuTimings.value[crn], {start: '08:00', end: '08:00', day: 0});
    hbkuTimings.updateField(crn, timings, (newState) => save<HBKUTimingsState>('hbkuTimings', newState))
  }

  return (
    <div>
      <h1>Table Page</h1>
      <select value={year} onChange={setState(setYear)}>
        {years.map((e, i) => (
          <option key={i} value={i + 1}>{e}</option>
        ))}
      </select>
      <Table
        timings={timings}
        onCellHover={handleCellHover}
      />
      <div className="grid grid-cols-3">
        <div>
          {
            crns.map(course => (
              <CourseCheckbox
                key={course}
                course={course}
                selected={coursesSelection.value.includes(course)}
                details={getTexasCourseDetails(course, data.howdy)}
                onChange={() => handleSelectionChange(course)}
              />
            ))
          }
        </div>
        <div>
          {
            hbkuCRNS.length ?
              hbkuCRNS
                .map((e: string) => ({...getHBKUCourseDetails(e, data.hbkuCourses), crn: e}))
                .map((e, index) => (e &&
                  <div key={e.crn}>
                    <p>{e.name} ({e.title})</p>
                    {
                      hbkuTimings.value[e.crn] ?
                        hbkuTimings.value[e.crn].map((t, i) => (
                          <div key={i}>
                            <label className="space-x-2">
                              <span>Start</span>
                              <input
                                type="time"
                                defaultValue={t.start}
                                onChange={(event) => handleHBKUTimingsChange(e.crn, i, 'start', event.target.value)}
                              />
                            </label>
                            <label className="space-x-2">
                              <span>End</span>
                              <input
                                type="time"
                                defaultValue={t.end}
                                onChange={(event) => handleHBKUTimingsChange(e.crn, i, 'end', event.target.value)}
                              />
                            </label>
                            <label className="space-x-2">
                              <span>Day</span>
                              <select
                                defaultValue={t.day}
                                onChange={(event) => handleHBKUTimingsChange(e.crn, i, 'day', parseInt(event.target.value))}
                              >
                                <option value={0}>Sunday</option>
                                <option value={1}>Monday</option>
                                <option value={2}>Tuesday</option>
                                <option value={3}>Wednesday</option>
                                <option value={4}>Thursday</option>
                              </select>
                            </label>
                          </div>
                        )) :
                        <p>No timings set</p>
                    }
                    <button onClick={handleAddHBKUTiming(e.crn)}>Add Timing</button>
                  </div>
                )) :
              <p className="text-white">No HBKU courses listed</p>
          }
        </div>
        <div>
          <CourseDetails hoveredCell={hoveredCell} howdy={data.howdy}/>
        </div>
      </div>
    </div>
  );
}

export default AdminGuard(TablePage);