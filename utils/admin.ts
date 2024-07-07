export const getSettings = () => {
  if (typeof window === 'undefined') return {}

  const settings = localStorage.getItem('settings')

  if (!settings) return {}

  return JSON.parse(settings)
}

export const updateSettings = async (data: object) => {
  return localStorage.setItem('settings', JSON.stringify(data))
}