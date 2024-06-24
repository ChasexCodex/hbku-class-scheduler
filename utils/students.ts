import {doc, getDoc, getDocs, setDoc, updateDoc, collection, writeBatch} from "@firebase/firestore";
import {db} from "@/utils/firebase";
import {HBKUCourse, StudentData} from "@/types";

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

export const createStudentData = async (uid: string, data: object) => {
  const d = doc(db, 'students', uid)
  return await setDoc(d, data)
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

export const getAllStudentsData = async ({}) => {
  const students = await getDocs(collection(db, 'students'))

  return students.docs.map(doc => doc.data() as StudentData)
}

export const getAllHBKUCourses = async ({}) => {
  const courses = await getDocs(collection(db, 'hbku_courses'))

  return courses.docs.map(doc => doc.data() as HBKUCourse)
}

export const updateHBKUCourses = async (courses: HBKUCourse[]) => {
  const batch = writeBatch(db)

  // Fetch all courses from the database
  const allCoursesSnapshot = await getDocs(collection(db, 'hbku_courses'))
  const allCourses = allCoursesSnapshot.docs.map(doc => doc.data() as HBKUCourse)

  // Update or add courses
  courses.forEach(course => {
    const d = doc(db, 'hbku_courses', course.crn)
    batch.set(d, course)
  })

  // Delete courses that are not present in the arguments
  allCourses.forEach(course => {
    if (!courses.find(c => c.crn === course.crn)) {
      const d = doc(db, 'hbku_courses', course.crn)
      batch.delete(d)
    }
  })

  try {
    await batch.commit()
    return {
      success: true,
      courses,
    }
  } catch (e) {
    return {
      success: false,
      error: e,
    }
  }
}

export const getAllTexasCourses = (term: string) => async (url: string) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "startRow": 0,
      "endRow": 0,
      "termCode": term,
      "publicSearch": "Y"
    })
  })

  return await res.json()
}