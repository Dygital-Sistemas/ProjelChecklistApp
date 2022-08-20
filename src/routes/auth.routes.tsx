import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../commons/styles';
import { HomeStackRoutes, SettingsStackRoutes } from './stack';

const Tab = createBottomTabNavigator();

const options: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  headerTintColor: 'red',
};

interface RouteItem {
  name: string;
  component: () => JSX.Element;
}

const routes: RouteItem[] = [
  {
    name: 'Home',
    component: HomeStackRoutes,
  },
  {
    name: 'Settings',
    component: SettingsStackRoutes,
  },
];

export type TabsParamList = {
  Home: undefined;
  Settings: undefined;
};

export const AuthTabRoutes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.lightGray,
          headerTitleStyle: {
            color: 'red',
          },
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case 'Home':
                return <Icon name="home" size={size} color={color} />;
              case 'Settings':
                return <Icon name="settings" size={size} color={color} />;
            }
          },
        })}>
        {routes.map(route => (
          <Tab.Screen key={route.name} options={options} {...route} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
