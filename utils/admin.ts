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