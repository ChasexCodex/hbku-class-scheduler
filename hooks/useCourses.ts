import useMultipleSWR from "@/hooks/useMultipleSWR";
import config from "@/utils/config";
import {getAllHBKUCourses, getAllStudentsData, getAllTexasCourses} from "@/utils/students";
import {HBKUCourseType, StudentData, SWVEntry} from "@/types";

type DataType = {
  studentsCourses: StudentData[]
  howdy: SWVEntry[]
  hbkuCourses: HBKUCourseType[]
}

const useCourses = (term: string) => {
  return useMultipleSWR<DataType>([
    {key: 'studentsCourses', dataName: 'studentsCourses', fetcher: getAllStudentsData, fallbackData: []},
    {key: config('coursesApi'), dataName: 'howdy', fetcher: getAllTexasCourses(term), fallbackData: []},
    {key: 'hbku_courses', dataName: 'hbkuCourses', fetcher: getAllHBKUCourses, fallbackData: []},
  ])
}

export default useCourses