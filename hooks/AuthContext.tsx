import {createContext, useContext, useState, useEffect, ReactNode, PropsWithChildren} from 'react';
import {onAuthStateChange} from "@/utils/auth";
import {User} from "@/types";

type AuthContextType = {
  user: any;
  loading: boolean;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChange((user) => {
      setUser({data: user});
      setLoading(false)
    })
  }, []);

  return (
    <AuthContext.Provider value={{user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;