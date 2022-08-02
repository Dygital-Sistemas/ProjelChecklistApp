import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SettingsScreen } from "../../screens/Settings";
import { options } from "./commons";

const Stack = createNativeStackNavigator();

export const SettingsStackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Configurações"
        options={options}
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};
