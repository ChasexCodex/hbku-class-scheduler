import useSWR from "swr";
import {getAllHBKUCourses, updateHBKUCourses} from "@/utils/students";
import {HBKUCourse} from "@/types";

const useHBKUCourses = () => {
  const swr = useSWR('hbku_courses', getAllHBKUCourses)

  const update = async (courses: HBKUCourse[]) => {
    const res = await updateHBKUCourses(courses)

    if (res.success)
    {
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