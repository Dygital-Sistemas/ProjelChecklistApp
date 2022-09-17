import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { CreateChecklist } from '../../screens/CreateChecklist';
import { HomeScreen } from '../../screens/Home';
import { TabsParamList } from '../auth.routes';
import { options } from './commons';

const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
  Checklists: undefined;
  CreateChecklist: { checklistId: string };
};

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'Home'>,
  NativeStackNavigationProp<HomeStackParamList>
>;

export const HomeStackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Checklists"
        options={options}
        component={HomeScreen}
      />

      <Stack.Screen
        options={{ ...options, title: 'Novo checklist' }}
        name="CreateChecklist"
        component={CreateChecklist}
      />
    </Stack.Navigator>
  );
};
