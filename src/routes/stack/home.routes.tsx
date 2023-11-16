import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { Checklist } from '../../databases/schemas';
import { Vehicle } from '../../databases/schemas/vehicle';
import { CreateChecklist } from '../../screens/CreateChecklist';
import { HomeScreen } from '../../screens/Home';
import { ShowChecklist } from '../../screens/ShowChecklist';
import { TabsParamList } from '../auth.routes';
import { options } from './commons';

const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
  Checklists: undefined;
  CreateChecklist: { checklistId: string };
  ShowChecklist: { item: Checklist; vehicle: Vehicle };
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

      <Stack.Screen
        options={{ ...options, title: 'Checklist' }}
        name="ShowChecklist"
        component={ShowChecklist}
      />
    </Stack.Navigator>
  );
};
