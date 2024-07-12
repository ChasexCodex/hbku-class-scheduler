import {JsonClob, LectureTime, StudentData, SWVEntry, Timing} from '@/types'
import {load} from '@/utils/storage'
import {SWVDays} from '@/utils/const'

export const getDistinctCoursesList = (students: StudentData[], year: number = 1): string[] => {
  return [...Array.from(new Set(students.filter(e => e.year === `${year}`).flatMap(student => student.texas_courses)))]
}

// time in HH:MM AM/PM format
export const toMinutes = (s: string) => {
  const hours = parseInt(s.slice(0, 2))
  const minutes = parseInt(s.slice(3, 5))
  const shift = (s.endsWith('PM') && hours !== 12) ? 12 : 0

  return minutes + 60 * (hours + shift)
}

// the reverse of toMinutes
export const toTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hours % 12}:${mins < 10 ? '0' : ''}${mins} ${hours >= 12 ? 'PM' : 'AM'}`
}

const getLectureDay = (lecture: JsonClob): number => {
  const swvDay = SWVDays.find(e => lecture[e])
  if (!swvDay) {
    throw new Error('No day found')
  }

  return SWVDays.indexOf(swvDay)
}

export const getLectureTimings = (crns: string[], howdyCourses: SWVEntry[]): LectureTime[] => {

  const courses = crns.map(e => howdyCourses.find(c => c.SWV_CLASS_SEARCH_CRN === e))

  const lectures = courses.flatMap(e => {
    if (!e || !e.SWV_CLASS_SEARCH_JSON_CLOB) return []
    const clobs = typeof e.SWV_CLASS_SEARCH_JSON_CLOB === 'string'
      ? JSON.parse(e.SWV_CLASS_SEARCH_JSON_CLOB) as JsonClob[]
      : e.SWV_CLASS_SEARCH_JSON_CLOB
    return clobs.map(clob => ({...clob, crn: e.SWV_CLASS_SEARCH_CRN}))
  })
    .filter(e => !!e.SSRMEET_BEGIN_TIME && !!e.SSRMEET_END_TIME)

  return lectures.map(e => ({
    start: toMinutes(e.SSRMEET_BEGIN_TIME),
    end: toMinutes(e.SSRMEET_END_TIME),
    day: getLectureDay(e),
    crn: e.crn,
    isCore: isCore(e.crn, howdyCourses),
  }))
}

export const groupIfOverlap = <T extends Timing>(timings: T[]): T[][] => {
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

export const isCore = (course: string, howdyCourses: SWVEntry[]): boolean => {
  const courseData = howdyCourses.find(e => e.SWV_CLASS_SEARCH_CRN === course)
  if (!courseData) return false

  const cores = load('cores')
  const subject = `${courseData.SWV_CLASS_SEARCH_SUBJECT} ${courseData.SWV_CLASS_SEARCH_COURSE}`

  return cores.includes(subject)
}

export const detectOverlap = (target: Timing, group: Timing[]): boolean => {
  return group.some(e => e.start < target.end && e.end > target.start)
}