import {PropsWithChildren} from 'react'
import {SWRConfig} from 'swr'
import config from '@/utils/config'

const localStorageProvider = <K, V>() => {
  if (typeof window === 'undefined') return new Map<K, V>()

  const map = new Map<K, V>(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  return map
}

const provider = config('env') === 'development' ? localStorageProvider : undefined

const SWRConfiguration = ({children}: PropsWithChildren) => {
  return (
    <SWRConfig value={{provider, suspense: true}}>
      {children}
    </SWRConfig>
  )
}

export default SWRConfiguration