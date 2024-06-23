import AdminGuard from "@/components/AdminGuard";
import useCourses from "@/hooks/useCourses";
import Loading from "@/components/Loading";
import {getLectureTimings, groupIfOverlap, toTime} from "@/utils/table";

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const TablePage = () => {
  const {data, isLoading, error} = useCourses('202433');

  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const timings = getLectureTimings(data.howdy, data.studentsCourses)


  return (
    <div>
      <h1>Table Page</h1>
      <div className="flex flex-col border">
        <div className="grid grid-cols-8 col-span-8">
          <div className="col-span-1"></div>
          {
            days.map((day, i) => (
              <div key={i} className="col-span-1">{day}</div>
            ))
          }
        </div>
      </div>
      <div className="grid grid-cols-8">
        <div>
          {Array.from({length: 13}).map((_, i) => (
            <div className="border" key={i}>
              {i > 5 ? i - 5 : i + 7}
            </div>
          ))}
        </div>
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
                            <div className="h-full bg-red-500 text-white text-center rounded-sm text-xs overflow-hidden flex flex-col justify-center">
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
  );
}

export default AdminGuard(TablePage);