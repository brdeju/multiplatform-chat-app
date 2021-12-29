/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: RootTabParamList;
  ChatRoom: {
    id: string;
    name: string;
  };
  NewMessage: undefined;
  NotFound: undefined;
};

export type AuthStackParamList = {
  SignIn: any;
  Register: any;
};

export type AuthNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthStackParamList, 'SignIn'>,
  NativeStackNavigationProp<AuthStackParamList>
>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Chats: any;
  Users: any;
  Logout: any;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ChatListItemProps = {
  chat: Chat;
}

export type ChatRoomScreenRouteProp = RouteProp<RootStackParamList, 'ChatRoom'>

export type User = {
  uuid: string;
  username: string;
}

export type Message = {
  uuid: string;
  content: string;
  createdAt: string;
  user: User;
}

export type Chat = {
  uuid: string;
  users: User[];
  lastMessage: Message;
}
