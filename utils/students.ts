import {getDoc, doc} from "@firebase/firestore";
import {db} from "@/utils/firebase";
import {User} from "@/types";

export const getStudentData = async (user: User) => {
  console.log(user.data.uid)
  const d = doc(db, 'students', user.data.uid)
  const snapshot = await getDoc(d);

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data()
}