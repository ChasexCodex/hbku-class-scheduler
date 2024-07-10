import {JsonClob} from '@/types'

export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  // 'Friday',
  // 'Saturday',
]

export const currentTerm = '202433'

export const years = ['Freshman', 'Sophomore', 'Junior', 'Senior']

export const SWVDays: Partial<keyof JsonClob>[] = [
  'SSRMEET_SUN_DAY',
  'SSRMEET_MON_DAY',
  'SSRMEET_TUE_DAY',
  'SSRMEET_WED_DAY',
  'SSRMEET_THU_DAY',
  'SSRMEET_FRI_DAY',
  'SSRMEET_SAT_DAY',
]