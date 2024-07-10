import {PropsWithChildren, Suspense} from 'react'
import Loading from '@/components/Loading'

const SWRSuspense = ({children}: PropsWithChildren) => {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  )
}

export default SWRSuspense