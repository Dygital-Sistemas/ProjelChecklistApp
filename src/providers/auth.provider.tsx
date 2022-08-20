import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { useQuery, useRealm } from '../databases/realm';
import { User } from '../databases/schemas/user';

interface AuthContextState {
  isLogged: boolean;
  login: (user: User) => void;
  logout: () => void;
  user: User;
}

const AuthContext = createContext({} as AuthContextState);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useQuery<User>('User')[0];
  const [isLogged, setIsLogged] = useState(!!user);
  const realm = useRealm();

  const createLoggedUser = (data: User) => {
    realm.write(() => {
      realm.create('User', data);
    });
  };

  const removeLoggedUser = () => {
    realm.write(() => {
      realm.delete(user);
    });
  };

  const login = (loggedUser: User) => {
    createLoggedUser(loggedUser);
    setIsLogged(true);
  };

  const logout = () => {
    removeLoggedUser();
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
