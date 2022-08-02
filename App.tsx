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
import {ActivityIndicator} from 'react-native';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {colors} from './src/commons/styles';
import {AuthProvider} from './src/contexts/auth.context';
import {RealmProvider} from './src/models/realm';
import {Routes} from './src/routes/routes';

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
      <AuthProvider>
        <PaperProvider theme={theme}>
          <Routes />
        </PaperProvider>
      </AuthProvider>
    </RealmProvider>
  );
};

export default App;
