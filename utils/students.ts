import {getDoc, doc, collection, getDocs} from "@firebase/firestore";
import {db} from "@/utils/firebase";
import {getUserDefinite} from "@/utils/auth";

export const getStudentData = async () => {
  const user = getUserDefinite()

  console.log(user.uid)
  const d = doc(db, 'students', user.uid)
  const snapshot = await getDoc(d);

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data()
}