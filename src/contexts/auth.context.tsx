import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface AuthContextState {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextState);

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [isLogged, setIsLogged] = useState(false);

  const login = () => {
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
