import {useAuth} from "@/hooks/AuthContext";
import {getAllHBKUCourses, getAllTexasCourses, getStudentData, updateStudentData} from "@/utils/students";
import useMultipleSWR from "@/hooks/useMultipleSWR";
import config from "@/utils/config";
import {HBKUCourseType, StudentData, SWVEntry} from "@/types";

type StudentDataType = {
  studentData: StudentData
  hbkuCourses: HBKUCourseType[]
  howdy: SWVEntry[]
}

export default function useStudentData(term: string) {
  const {user} = useAuth();

  const {mutate, ...swr} = useMultipleSWR<StudentDataType>([
    {key: user?.data?.uid, dataName: 'studentData', fetcher: getStudentData, fallbackData: {}},
    {key: 'hbku_courses', dataName: 'hbkuCourses', fetcher: getAllHBKUCourses, fallbackData: []},
    {key: config('coursesApi'), dataName: 'howdy', fetcher: getAllTexasCourses(term), fallbackData: []}
  ])

  const update = async (data: any) => {
    await updateStudentData(user.data.uid, data);
    await mutate.studentData();
  }

  return {...swr, update}
}