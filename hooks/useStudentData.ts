import {useUser} from '@/hooks/AuthContext'
import {getAllHBKUCourses, getAllTexasCourses, getStudentData, updateStudentData} from '@/utils/students'
import useMultipleSWR from '@/hooks/useMultipleSWR'
import config from '@/utils/config'
import {HBKUCourseType, StudentData, SWVEntry} from '@/types'

type StudentDataType = {
  studentData: StudentData
  hbkuCourses: HBKUCourseType[]
  howdy: SWVEntry[]
}

export default function useStudentData(term: string) {
  const user = useUser()

  const {mutate, ...swr} = useMultipleSWR<StudentDataType>([
    {key: user.uid, dataName: 'studentData', fetcher: getStudentData},
    {key: 'hbku_courses', dataName: 'hbkuCourses', fetcher: getAllHBKUCourses},
    {key: config('coursesApi'), dataName: 'howdy', fetcher: getAllTexasCourses(term)},
  ])

  const update = (data: StudentData) => updateStudentData(user.uid, data).then(mutate.studentData)

  return {...swr, update}
}