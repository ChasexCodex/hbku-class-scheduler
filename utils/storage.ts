export const save = <T extends object>(key: string, data: T | T[]) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const load = <T>(key: string, def: any = null) => {
  if (typeof window === 'undefined') return def

  const data = localStorage.getItem(key)

  if (!data) return def

  return JSON.parse(data) as T | T[]
}