import useSWR from 'swr'
import {getAllHBKUCourses, updateHBKUCourses} from '@/utils/students'
import {HBKUCourseType} from '@/types'

const useHBKUCourses = () => {
  const swr = useSWR('hbku_courses', getAllHBKUCourses)

  const update = (courses: HBKUCourseType[]) => updateHBKUCourses(courses).then(swr.mutate)

  return {...swr, update}
}

export default useHBKUCourses