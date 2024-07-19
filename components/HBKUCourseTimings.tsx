import {getHBKUCourseDetails} from '@/utils/students'
import {days} from '@/utils/const'
import {HBKUCourseType, HBKUTiming, HBKUTimingsState} from '@/types'

type Props = {
  crns: string[]
  courses: HBKUCourseType[]
  timings: HBKUTimingsState
  handleTimingsChange: (crn: string, index: number, key: keyof HBKUTiming, value: HBKUTiming[keyof HBKUTiming]) => void
  handleAddTiming: (crn: string) => void
  handleRemoveTiming: (crn: string, index: number) => void
}

const HBKUCourseTimings = ({crns, courses, timings, handleTimingsChange, handleAddTiming, handleRemoveTiming}: Props) => {
  return (
    <div className="rounded-lg border-2 border-gray-400 px-4 pb-4 pt-2">
      <p className="text-xl mb-4 font-semibold text-gray-700 dark:text-gray-100">HBKU Courses Timings</p>
      <div className="space-y-2">
        {crns?.map(e => getHBKUCourseDetails(e, courses)!)
            .filter(e => e)
            .toSorted((a, b) => a.name.localeCompare(b.name))
            .map(e => (
              <div key={e.crn} className="space-y-2 border-2 p-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-md border-gray-600">
                <p className="text-grey-700 dark:text-gray-100">{e.name} ({e.title})</p>
                {timings[e.crn]?.map((t, i) => (
                    <div key={i}
                         className="relative flex flex-row justify-between text-sm bg-zinc-300 dark:bg-zinc-500 p-2 rounded-md border">
                      <button
                        type="button"
                        onClick={() => handleRemoveTiming(e.crn, i)}
                        className="absolute top-1 right-1 bg-red-500 rounded-full h-5 w-5 p-0.5 leading-3 font-bold text-gray-200">
                        x
                      </button>
                      <label className="flex flex-col gap-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Start</span>
                        <input
                          type="time"
                          defaultValue={t.start}
                          className="bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-600"
                          onChange={(event) => handleTimingsChange(e.crn, i, 'start', event.target.value)}
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">End</span>
                        <input
                          type="time"
                          defaultValue={t.end}
                          className="bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-600"
                          onChange={(event) => handleTimingsChange(e.crn, i, 'end', event.target.value)}
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Day</span>
                        <select
                          defaultValue={t.day}
                          className="bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 h-min py-1 px-2 rounded-md border border-gray-600"
                          onChange={(event) => handleTimingsChange(e.crn, i, 'day', parseInt(event.target.value))}>
                          {days.map((day, i) => (
                            <option key={i} value={i}>{day}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  )) ||
                  <p className="text-gray-700 dark:text-gray-300">No timings set</p>
                }
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                  onClick={() => handleAddTiming(e.crn)}>Add Timing
                </button>
              </div>
            )) ||
          <p className="text-gray-700 dark:text-gray-300">No HBKU courses listed</p>
        }
      </div>
    </div>
  )
}

export default HBKUCourseTimings