import useMultipleSWR from "@/hooks/useMultipleSWR";
import config from "@/utils/config";
import {getAllStudentsData, getAllTexasCourses} from "@/utils/students";

const useCourses = (term: string) => {
  return useMultipleSWR([
    {key: 'studentsCourses', dataName: 'studentsCourses', fetcher: getAllStudentsData},
    {key: config('coursesApi'), dataName: 'howdy', fetcher: getAllTexasCourses(term)},
  ])
}

export default useCourses