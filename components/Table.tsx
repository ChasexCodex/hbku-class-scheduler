import {groupIfOverlap, toTime} from "@/utils/table";
import {LectureTime} from "@/types";

type Props = {
  timings: LectureTime[]
  days: string[]
}

const Table = ({timings, days}: Props) => {
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
              <div key={i} className="border">{day}</div>
            ))
          }
        </div>
        <div className="flex-1 grid grid-cols-5">
          {
            days.map((_, day) => (
              <div key={day} className="border relative">
                {
                  groupIfOverlap(timings.filter(e => e.day === day))
                    .map((group, i) => (
                      <div key={i}
                           className="absolute inset-0 grid gap-x-0.5"
                           style={{
                             gridTemplateColumns: `repeat(${group.length}, minmax(0, 1fr))`,
                           }}>
                        {group.map(({start, end}, j) => (
                          <div key={j} className="relative">
                            <div className="absolute left-0 right-0"
                                 style={{
                                   top: `${(start - 7 * 60) / (13 * 60) * 100}%`,
                                   bottom: `${(20 * 60 - end) / (13 * 60) * 100}%`,
                                 }}>
                              <div
                                className="h-full bg-red-500 text-white text-center rounded-sm text-xs overflow-hidden flex flex-col justify-center">
                                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full ">
                                  {toTime(start)} - {toTime(end)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
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

export default Table;