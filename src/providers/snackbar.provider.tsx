import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { Snackbar } from 'react-native-paper';
import { colors } from '../commons/styles';

interface SnackBarState {
  show: (text: string, type?: 'success' | 'error') => void;
}

type SnackBarOptions = {
  text: string;
  type: 'success' | 'error';
};

// snackbar context
const SnackbarContext = createContext({} as SnackBarState);

// snackbar provider
export const SnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<SnackBarOptions>({
    text: '',
    type: 'success',
  });

  const onDismiss = () => {
    setVisible(false);
  };

  const show = (text: string, type: SnackBarOptions['type'] = 'success') => {
    setOptions(opt => ({ ...opt, text, type }));
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      <Snackbar
        visible={visible}
        style={{ backgroundColor: colors[options.type] }}
        onDismiss={onDismiss}
        duration={5000}>
        {options.text}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
