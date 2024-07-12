import AdminGuard from '@/components/AdminGuard'
import useCourses from '@/hooks/useCourses'
import {getDistinctCoursesList, getLectureTimings} from '@/utils/table'
import Table from '@/components/Table'
import {useState} from 'react'
import {getHBKUCourseDetails, getTexasCourseDetails} from '@/utils/students'
import {currentTerm, days, years} from '@/utils/const'
import {setState} from '@/utils/form'
import CourseCheckbox from '@/components/CourseCheckbox'
import CourseDetails from '@/components/CourseDetails'
import {useArrayState, useObjectState} from '@/hooks/state'
import {load, save} from '@/utils/storage'
import {HBKUCourseType, HBKUTiming, HBKUTimingsState} from '@/types'
import _ from 'lodash'
import SWRSuspense from '@/components/SWRSuspense'
import {setUserLayout} from '@/layouts/UserLayout'
import HBKUCourseTimings from '@/components/HBKUCourseTimings'

const TablePage = () => {
  const {data} = useCourses(currentTerm)
  const [year, setYear] = useState(3)
  const [hoveredCell, setHoveredCell] = useState<string>()
  const hbkuTimings = useObjectState<HBKUTimingsState>(() => {
    const savedTimings = load<HBKUTimingsState>('hbkuTimings', {})
    const s = data.hbkuCourses.flatMap((e: HBKUCourseType) => e.crn)
    return Object.fromEntries(s.map((e: string) => [e, savedTimings[e] || []]))
  })

  const crns = (data && data.studentsCourses) ? getDistinctCoursesList(data.studentsCourses, year) : []
  const coursesSelection = useArrayState(crns)

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

  function handleHBKUTimingsChange<K extends keyof HBKUTiming>(crn: string, index: number, key: K, value: HBKUTiming[K]) {
    const timings = _.cloneDeep(hbkuTimings.value[crn])
    timings[index][key] = value
    hbkuTimings.updateField(crn, timings, (newState) => save<HBKUTimingsState>('hbkuTimings', newState))
  }

  const handleAddHBKUTiming = (crn: string) => {
    const timings = _.concat(hbkuTimings.value[crn], {start: '08:00', end: '08:00', day: 0})
    hbkuTimings.updateField(crn, timings, (newState) => save<HBKUTimingsState>('hbkuTimings', newState))
  }

  const handleRemoveHBKUTiming = (crn: string, index: number) => {
    const timings = _.filter(hbkuTimings.value[crn], (_, i) => index !== i)
    hbkuTimings.updateField(crn, timings, (newState) => save<HBKUTimingsState>('hbkuTimings', newState))
  }

  return (
    <SWRSuspense>
      <div className="container mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Table Page</h1>
        <select className="py-1 px-2 rounded-md" value={year} onChange={setState(setYear)}>
          {years.map((e, i) => (
            <option key={i} value={i + 1}>{e}</option>
          ))}
        </select>
        <Table
          texasTimings={timings}
          hbkuTimings={hbkuTimings.value}
          onCellHover={handleCellHover}
        />
        <div className="grid grid-cols-3 gap-4">
          <HBKUCourseTimings
            crns={hbkuCRNS}
            courses={data.hbkuCourses}
            timings={hbkuTimings.value}
            handleTimingsChange={handleHBKUTimingsChange}
            handleAddTiming={handleAddHBKUTiming}
            handleRemoveTiming={handleRemoveHBKUTiming}
          />
          <div>
            <div className="rounded-lg border-2 bg-zinc-800 px-4 pb-4 pt-2">
              <p className="text-xl mb-2 font-semibold">Course Selection</p>
              <div className="space-y-1">
                {crns
                  .map(course => getTexasCourseDetails(course, data.howdy)!)
                  .filter(e => e)
                  .map(({crn, ...details}) => (
                    <CourseCheckbox
                      key={crn}
                      course={crn}
                      details={details}
                      selected={coursesSelection.value.includes(crn)}
                      onChange={() => handleSelectionChange(crn)}
                    />
                  ))
                }
              </div>
            </div>
          </div>
          <div>
            <CourseDetails hoveredCell={hoveredCell} howdy={data.howdy} hbkuCourses={data.hbkuCourses}/>
          </div>
        </div>
      </div>
    </SWRSuspense>
  )
}

export default setUserLayout(AdminGuard(TablePage))