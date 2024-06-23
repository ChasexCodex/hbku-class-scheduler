import {JsonClob, LectureTime, StudentData, SWVEntry} from "@/types";

const days: Partial<keyof JsonClob>[] = [
  'SSRMEET_SUN_DAY',
  'SSRMEET_MON_DAY',
  'SSRMEET_TUE_DAY',
  'SSRMEET_WED_DAY',
  'SSRMEET_THU_DAY',
  'SSRMEET_FRI_DAY',
  'SSRMEET_SAT_DAY',
]

const getDistinctCoursesList = (students: StudentData[]): string[] => {
  return [...Array.from(new Set(students.flatMap(student => student.texas_courses)))]
}

// time in HH:MM AM/PM format
export const toMinutes = (s: string) => {
  const hours = parseInt(s.slice(0, 2))
  const minutes = parseInt(s.slice(3, 5))
  const shift = (s.endsWith("PM") && hours !== 12) ? 12 : 0

  return minutes + 60 * (hours + shift)
}

// the reverse of toMinutes
export const toTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hours % 12}:${mins < 10 ? '0' : ''}${mins} ${hours >= 12 ? 'PM' : 'AM'}`
}

const getLectureDay = (lecture: JsonClob): number => {
  const swvDay = days.find(e => lecture[e])
  if (!swvDay) {
    throw new Error('No day found')
  }

  return days.indexOf(swvDay)
}

export const getLectureTimings = (howdyCourses: SWVEntry[], students: StudentData[]): LectureTime[] => {
  const crns = getDistinctCoursesList(students)

  const courses = crns.map(e => howdyCourses.find(c => c.SWV_CLASS_SEARCH_CRN === e))

  const lectures = courses.flatMap(e => {
    if (!e || !e.SWV_CLASS_SEARCH_JSON_CLOB) return []
    if (typeof e.SWV_CLASS_SEARCH_JSON_CLOB === 'string') {
      return JSON.parse(e.SWV_CLASS_SEARCH_JSON_CLOB) as JsonClob
    }
    return e.SWV_CLASS_SEARCH_JSON_CLOB
  })
    .filter(e => !!e.SSRMEET_BEGIN_TIME && !!e.SSRMEET_END_TIME)

  return lectures.map(e => ({
    start: toMinutes(e.SSRMEET_BEGIN_TIME),
    end: toMinutes(e.SSRMEET_END_TIME),
    day: getLectureDay(e),
  }))
}

export const groupIfOverlap = (timings: LectureTime[]): LectureTime[][] => {
  if (timings.length === 0) return []

  const sorted = timings.sort((a, b) => a.start - b.start)

  let groups = []
  let currentGroup = [sorted[0]]

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i]
    const last = currentGroup[currentGroup.length - 1]

    if (current.start < last.end) {
      currentGroup.push(current)
    } else {
      groups.push(currentGroup)
      currentGroup = [current]
    }
  }

  groups.push(currentGroup)

  return groups
}