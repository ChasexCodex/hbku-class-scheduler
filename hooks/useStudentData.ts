import {useAuth} from "@/hooks/AuthContext";
import useSWR from "swr";
import {getAllHBKUCourses, getAllTexasCourses, getStudentData, updateStudentData} from "@/utils/students";
import useMultipleSWR from "@/hooks/useMultipleSWR";
import config from "@/utils/config";


export default function useStudentData(term: string) {
  const {user} = useAuth();

  const {mutate, ...swr} = useMultipleSWR([
    {key: user?.data?.uid, dataName: 'studentData', fetcher: getStudentData},
    {key: 'hbku_courses', dataName: 'hbkuCourses', fetcher: getAllHBKUCourses},
    {key: config('coursesApi'), dataName: 'howdy', fetcher: getAllTexasCourses(term)}
  ])

  const update = async (data: any) => {
    await updateStudentData(user.data.uid, data);
    await mutate.studentData();
  }

  return {...swr, update}
}