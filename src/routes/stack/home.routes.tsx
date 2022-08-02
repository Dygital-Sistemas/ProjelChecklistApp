import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../../screens/Home";
import { options } from "./commons";

const Stack = createNativeStackNavigator();

export const HomeStackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Checklists"
        options={options}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};
