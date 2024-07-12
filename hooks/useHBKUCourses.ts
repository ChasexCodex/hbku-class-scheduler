import useSWR from 'swr'
import {getAllHBKUCourses, updateHBKUCourses} from '@/utils/students'
import {HBKUCourseType} from '@/types'

const useHBKUCourses = () => {
  const swr = useSWR('hbku_courses', getAllHBKUCourses, {fallbackData: []})

  const update = async (courses: HBKUCourseType[]) => {
    const res = await updateHBKUCourses(courses)

    if (res.success) {
      await swr.mutate(res.courses)
    }

    return res
  }

  return {
    ...swr,
    update,
  }
}

export default useHBKUCourses