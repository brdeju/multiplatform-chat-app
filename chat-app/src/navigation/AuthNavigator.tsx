import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../types';
import LoginScreen from '../screens/LoginScreen';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const colorsSchema = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorsSchema].tint,
        },
        headerTintColor: Colors[colorsSchema].background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
