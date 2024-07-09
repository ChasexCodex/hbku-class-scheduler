export const getSettings = () => {
  if (typeof window === 'undefined') return {}

  const settings = localStorage.getItem('settings')

  if (!settings) return {}

  return JSON.parse(settings)
}

export const updateSettings = async (data: object) => {
  return localStorage.setItem('settings', JSON.stringify(data))
}

export const getCores = () => {
  if (typeof window === 'undefined') return []

  const cores = localStorage.getItem('cores')

  if (!cores) return []

  return JSON.parse(cores)
}

export const updateCores = (data: string[]) => {
  return localStorage.setItem('cores', JSON.stringify(data))
}

export const saveToLocalStorage = <T extends object>(key: string, data: T | T[]) => {
  return localStorage.setItem(key, JSON.stringify(data))
}

export const getFromLocalStorage = <T extends object>(key: string, def: T | null = null) => {
  const data = localStorage.getItem('data')

  if (!data) return def

  return JSON.parse(data) as T | T[]
}