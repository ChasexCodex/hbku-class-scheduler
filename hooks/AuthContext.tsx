import {createContext, useContext, useState, useEffect, ReactNode, PropsWithChildren} from 'react';
import {useRouter} from 'next/router';
import {onAuthStateChange, login, logout} from "@/utils/auth";
import {User} from "@/types";

type AuthContextType = {
  user: any;
  loading: boolean;
  login: (data: FormData) => Promise<any>;
  logout: () => Promise<any>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChange((user) => {
      setUser({data: user});
      setLoading(false)
    })
  }, []);

  const utils = {
    login: async (credentials: FormData) => {
      const res = await login(credentials)

      if (res.success) {
        await router.push('/dashboard');
      }

      return res
    },

    logout: async () => {
      const res = await logout()

      if (res.success) {
        await router.push('/login');
      }

      return res
    }
  }

  return (
    <AuthContext.Provider value={{user, ...utils, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;