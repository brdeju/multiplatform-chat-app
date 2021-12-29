import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text } from 'react-native';

import { RootStackParamList } from '../../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ModalScreen from '../screens/ModalScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
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
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} options={({ route }) => ({ title: route.params.name })} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group
        screenOptions={({ navigation }) => ({
          presentation: 'modal',
          title: 'New message',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Text>Cancel</Text>
            </Pressable>
          ),
        })}
      >
        <Stack.Screen name="NewMessage" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
