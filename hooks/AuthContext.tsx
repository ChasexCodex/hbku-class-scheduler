import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react'
import {onAuthStateChange} from '@/utils/auth'
import {User} from '@/types'

type AuthContextType = {
  user: User | undefined
  isLoading: boolean
}

const defaultAuthContext: AuthContextType = {
  user: undefined,
  isLoading: true,
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChange((user) => {
      setUser(user)
      setIsLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{user, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export const useUser = () => useContext(AuthContext).user!

export default AuthContext