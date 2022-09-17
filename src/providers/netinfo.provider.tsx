import NetInfo from '@react-native-community/netinfo';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

interface NetinfoState {
  isOnline: boolean;
}

const NetinfoContext = createContext({} as NetinfoState);

export const NetinfoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribeNetinfo = NetInfo.addEventListener(state => {
      setIsOnline(!!state.isInternetReachable);
    });

    return () => {
      unsubscribeNetinfo();
    };
  }, []);

  return (
    <NetinfoContext.Provider value={{ isOnline }}>
      {children}
    </NetinfoContext.Provider>
  );
};

export const useNetinfo = () => useContext(NetinfoContext);

export const NetinfoConsumer = NetinfoContext.Consumer;
