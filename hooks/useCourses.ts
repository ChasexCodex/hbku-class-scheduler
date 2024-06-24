import useMultipleSWR from "@/hooks/useMultipleSWR";
import config from "@/utils/config";
import {getAllStudentsData} from "@/utils/students";

const howdyCoursesListFetcher = (term: string) => (url: string) => fetch(url, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    "startRow": 0,
    "endRow": 0,
    "termCode": term,
    "publicSearch": "Y"
  })
}).then(res => res.json())


const useCourses = (term: string) => {
  return useMultipleSWR([
    {key: 'studentsCourses', dataName: 'studentsCourses', fetcher: getAllStudentsData},
    {key: config('coursesApi'), dataName: 'howdy', fetcher: howdyCoursesListFetcher(term)},
  ])
}

export default useCourses