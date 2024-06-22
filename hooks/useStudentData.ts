import {useAuth} from "@/hooks/AuthContext";
import useSWR from "swr";
import {getStudentData, updateStudentData} from "@/utils/students";


export default function useStudentData() {
  const {user} = useAuth();
  const swr = useSWR(user?.data?.uid, getStudentData);

  const update = async (data: any) => {
    await updateStudentData(user.data.uid, data);
    await swr.mutate();
  }

  return {...swr, update}
}