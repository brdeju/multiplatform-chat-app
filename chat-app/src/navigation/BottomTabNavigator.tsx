import React from 'react';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatsScreen from '../screens/ChatsScreen';
import { RootTabParamList, RootTabScreenProps } from '../../types';
import SignOutScreen from '../screens/SignOutScreen';
import UsersScreen from '../screens/UsersScreen';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ navigation }: RootTabScreenProps<'Chats'>) => ({
          title: 'Chats',
          tabBarIcon: ({ color }) => <TabBarIcon name="comment" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('NewMessage')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="edit" size={25} color={Colors[colorScheme].text} style={{ marginRight: 15 }} />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Users"
        component={UsersScreen}
        options={() => ({
          title: 'Contacts',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Logout"
        component={SignOutScreen}
        options={() => ({
          title: 'Logout',
          tabBarIcon: ({ color }) => <TabBarIcon name="sign-out" color={color} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
