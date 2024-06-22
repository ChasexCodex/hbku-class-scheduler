import useSWR from "swr";
import config from "@/utils/config";
import {getAllStudentsData} from "@/utils/students";

const howdyCoursesListFetcher = (url: string, term: string) => fetch(url, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    "startRow": 0,
    "endRow": 0,
    "termCode": term,
    "publicSearch": "Y"
  })
}).then(res => res.json())


// combine howdyCoursesListFetcher and getAllStudentsData into one fetcher
const fetcher = (term: string) => async (url: string) => {
  const data = await Promise.all([
    howdyCoursesListFetcher(url, term),
    getAllStudentsData(),
  ])

  return {
    howdy: data[0],
    studentsCourses: data[1],
  }
}

const useCourses = (term: string) => {
  return useSWR(config('coursesApi'), {
    fetcher: fetcher(term),
  })
}

export default useCourses