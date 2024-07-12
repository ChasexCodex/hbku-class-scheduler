import {detectOverlap, groupIfOverlap, toMinutes, toTime} from '@/utils/table'
import {HBKUTimingsState, LectureTime, MappedTiming} from '@/types'
import {days} from '@/utils/const'

type Props = {
  texasTimings: LectureTime[],
  onCellHover: (crn: string, enter: boolean) => void,
  hbkuTimings: HBKUTimingsState
}

type CellProps = MappedTiming & {
  onCellHover: (crn: string, enter: boolean) => void
  isCore?: boolean
  overlap?: boolean
}

const Cell = ({start, end, crn, type, onCellHover, isCore, overlap}: CellProps) => {
  const color = type === 'texas' ? (isCore ? 'bg-red-500' : 'bg-green-500') : (overlap ? 'bg-yellow-500' : 'bg-blue-500')

  return (
    <div className="relative">
      <div className="absolute left-0 right-0"
           style={{
             top: `${(start - 7 * 60) / (13 * 60) * 100}%`,
             bottom: `${(20 * 60 - end) / (13 * 60) * 100}%`,
           }}>
        <div
          onMouseEnter={() => onCellHover(crn, true)}
          onMouseLeave={() => onCellHover(crn, false)}
          className={`h-full ${color} text-white text-center rounded-sm text-xs overflow-hidden flex flex-col justify-center pointer-events-auto hover:ring hover:ring-blue-600`}>
          <p className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
            {toTime(start)} - {toTime(end)}
          </p>
        </div>
      </div>
    </div>
  )
}

const Table = ({texasTimings, hbkuTimings, onCellHover}: Props) => {
  const texasTimingsMapped: MappedTiming[] = texasTimings.map(e => ({...e, type: 'texas'}))
  const hbkuTimingsMapped = Object
    .entries(hbkuTimings)
    .map(([crn, e]) => e.map((e) => ({
      start: toMinutes(e.start),
      end: toMinutes(e.end),
      day: e.day,
      crn: crn,
      type: 'hbku',
    } as MappedTiming))).flat()

  return (
    <div className="flex flex-row border">
      <div>
        <div className="border text-center">/</div>
        {Array.from({length: 13}).map((_, i) => (
          <div className="border text-center" key={i}>
            {i > 5 ? i - 5 : i + 7}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-5">
          {
            days.map((day, i) => (
              <p key={i} className="border text-center">{day}</p>
            ))
          }
        </div>
        <div className="flex-1 grid grid-cols-5">
          {
            days.map((_, day) => (
              <div key={day} className="border relative pointer-events-none">
                {
                  groupIfOverlap(texasTimingsMapped.filter(e => e.day === day))
                    .map((group, i) => (
                      <div key={i}
                           className="absolute inset-0 grid gap-x-0.5"
                           style={{
                             gridTemplateColumns: `repeat(${group.length}, minmax(0, 1fr))`,
                           }}>
                        {group.map((lectureTime, j) => (
                          <Cell key={j} {...lectureTime} onCellHover={onCellHover}/>
                        ))}
                      </div>
                    ))
                }
                {
                  hbkuTimingsMapped.filter(e => e.day === day)
                    .map((e, j) => (
                      <div key={e.crn} className="absolute inset-0 grid opacity-80">
                        <Cell {...e} onCellHover={onCellHover} overlap={detectOverlap(e, texasTimingsMapped.filter(e => e.day === day))}/>
                      </div>
                    ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Table