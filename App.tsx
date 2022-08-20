/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { ActivityIndicator } from 'react-native';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { colors } from './src/commons/styles';
import { RealmProvider } from './src/databases/realm';
import { AuthProvider } from './src/providers/auth.provider';
import { NetinfoProvider } from './src/providers/netinfo.provider';
import { SnackbarProvider } from './src/providers/snackbar.provider';
import { Routes } from './src/routes/routes';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
};

const App = () => {
  return (
    <RealmProvider fallback={<ActivityIndicator />}>
      <PaperProvider theme={theme}>
        <SnackbarProvider>
          <AuthProvider>
            <NetinfoProvider>
              <Routes />
            </NetinfoProvider>
          </AuthProvider>
        </SnackbarProvider>
      </PaperProvider>
    </RealmProvider>
  );
};

export default App;
