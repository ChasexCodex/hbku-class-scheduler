import {collection, doc, getDoc, getDocs, setDoc, updateDoc, writeBatch} from '@firebase/firestore'
import {db} from '@/utils/firebase'
import {HBKUCourseType, StudentData, SWVEntry} from '@/types'
import config from '@/utils/config'

export const getStudentData = async (uid: string) => {
  const d = doc(db, 'students', uid)
  const snapshot = await getDoc(d)

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
      })
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
      })
    })
}

export const getAllStudentsData = async ({}) => {
  const students = await getDocs(collection(db, 'students'))

  return students.docs.map(doc => doc.data() as StudentData)
}

export const getAllHBKUCourses = async ({}) => {
  const courses = await getDocs(collection(db, 'hbku_courses'))

  if (courses.empty) {
    return [] as HBKUCourseType[]
  }

  return courses.docs.map(doc => doc.data() as HBKUCourseType)
}

export const updateHBKUCourses = async (courses: HBKUCourseType[]) => {
  const batch = writeBatch(db)

  // Fetch all courses from the database
  const allCoursesSnapshot = await getDocs(collection(db, 'hbku_courses'))
  const allCourses = allCoursesSnapshot.docs.map(doc => doc.data() as HBKUCourseType)

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

export const getAllTexasCourses = (term: string) => async () => {
  try {
    let res = await fetch(`${config('appUrl')}/api/howdy`, {
      body: JSON.stringify({term}),
      headers: {'Content-Type': 'application/json'},
      mode: 'no-cors',
      method: 'POST',
    })

    console.log(await res.text())
    return res.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getHBKUCourseDetails = (crn: string, hbkuCourses: HBKUCourseType[]) => {
  const course = hbkuCourses.find((course: HBKUCourseType) => course.crn === crn)

  if (!course) return undefined

  return {
    crn,
    name: course.name,
    title: course.title,
    instructor: course.instructor,
  }
}

export const getTexasCourseDetails = (crn: string, howdy: SWVEntry[]) => {
  const course: SWVEntry | undefined = howdy.find((course: SWVEntry) => course.SWV_CLASS_SEARCH_CRN === crn)

  if (!course) return undefined

  return {
    crn,
    name: `${course.SWV_CLASS_SEARCH_SUBJECT} ${course.SWV_CLASS_SEARCH_COURSE}`,
    title: course.SWV_CLASS_SEARCH_TITLE,
    section: course.SWV_CLASS_SEARCH_SECTION,
    instructor: Array.isArray(course.SWV_CLASS_SEARCH_INSTRCTR_JSON) ? course.SWV_CLASS_SEARCH_INSTRCTR_JSON[0].NAME : JSON.parse(course.SWV_CLASS_SEARCH_INSTRCTR_JSON)[0].NAME,
  }
}