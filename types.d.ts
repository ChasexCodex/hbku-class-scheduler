import {ComponentType} from "react";

export type User = {
  data: any
}

export type StudentData = {
  name: string
  year: string
  uid: string
  texas_courses: string[]
  hbku_courses: string[]
}

export type LectureTime = {
  day: number
  start: number
  end: number
  crn: string
  isCore: boolean
}

interface SWVEntry {
  ASSWV_WAIT_COUNT: string;
  HRS_COLUMN_FIELD: number;
  SWV_CLASS_SEARCH_COURSE: string;
  SWV_CLASS_SEARCH_CRN: string;
  SWV_CLASS_SEARCH_ENRL: string;
  SWV_CLASS_SEARCH_HAS_SYL_IND: string;
  SWV_CLASS_SEARCH_HOURS_LOW: number;
  SWV_CLASS_SEARCH_INSTRCTR_JSON: string | Instructor[];
  SWV_CLASS_SEARCH_INST_TYPE: string;
  SWV_CLASS_SEARCH_JSON_CLOB: JsonClob[] | string;
  SWV_CLASS_SEARCH_MAX_ENRL: string;
  SWV_CLASS_SEARCH_PTRM: string;
  SWV_CLASS_SEARCH_SCHD: string;
  SWV_CLASS_SEARCH_SEATS_AVAIL: string;
  SWV_CLASS_SEARCH_SECTION: string;
  SWV_CLASS_SEARCH_SESSION: string;
  SWV_CLASS_SEARCH_SUBJECT: string;
  SWV_CLASS_SEARCH_SUBJECT_DESC: string;
  SWV_CLASS_SEARCH_TERM: string;
  SWV_CLASS_SEARCH_TITLE: string;
  SWV_WAIT_AVAIL: string;
  SWV_WAIT_CAPACITY: string;
}

interface Instructor {
  NAME: string;
  MORE: number;
  HAS_CV: string;
}

interface JsonClob {
  SSRMEET_CREDIT_HR_SESS: number;
  SSRMEET_SUN_DAY: string | null;
  SSRMEET_MON_DAY: string | null;
  SSRMEET_TUE_DAY: string | null;
  SSRMEET_WED_DAY: string | null;
  SSRMEET_THU_DAY: string | null;
  SSRMEET_FRI_DAY: string | null;
  SSRMEET_SAT_DAY: string | null;
  SSRMEET_BEGIN_TIME: string;
  SSRMEET_END_TIME: string;
  SSRMEET_START_DATE: string;
  SSRMEET_END_DATE: string;
  SSRMEET_BLDG_CODE: string;
  SSRMEET_ROOM_CODE: string;
  SSRMEET_MTYP_CODE: string;
}

export type PageWithLayout = ComponentType & { layout?: ComponentType }

export type HBKUCourseType = {
  crn: string
  name: string
  title: string
  instructor: string[]
}

export type Promiseable<T> = T | Promise<T>
