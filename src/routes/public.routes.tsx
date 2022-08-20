import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from '../screens/Login';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

interface RouteItem {
  name: string;
  component: React.FunctionComponent;
}

const routes: RouteItem[] = [
  {
    name: 'Home',
    component: LoginScreen,
  },
];

export const PublicTabRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routes.map(route => (
          <Stack.Screen key={route.name} options={options} {...route} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
