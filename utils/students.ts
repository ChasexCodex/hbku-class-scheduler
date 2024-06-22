import {getDoc, doc, updateDoc} from "@firebase/firestore";
import {db} from "@/utils/firebase";
import {StudentData} from "@/types";

export const getStudentData = async (uid: string) => {
  const d = doc(db, 'students', uid)
  const snapshot = await getDoc(d);

  if (!snapshot.exists()) {
    throw new Error('Student data not found')
  }

  return snapshot.data() as StudentData
}

export const updateStudentData = async (uid: string, data: object) => {
  const d = doc(db, 'students', uid)
  return await updateDoc(d, data)
    .then(() => ({
      success: true,
      data,
    }))
    .catch(e => {
      console.log(e)

      return ({
        success: false,
        error: e,
      });
    })
}