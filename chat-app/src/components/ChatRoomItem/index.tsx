import React from 'react';
import { Text, View, Pressable } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment';

// import { User, Message, ChatRoom } from '../../src/models';
import { useAuth } from '../../auth/Auth';
import styles from './styles';

export default function ChatRoomItem({ chat, onPress }: any) {
  const { user: currentUser } = useAuth();

  const user = chat.members.find((u: any) => u.userid !== currentUser?.userid);
  const { lastMessage } = chat;

  const time = lastMessage ? moment(lastMessage?.sentAt).from(moment()) : null;

  return (
    <Pressable onPress={onPress.bind(null, chat, user)} style={styles.container}>
      <UserAvatar size={50} name={user?.username} src={user?.imageUri} style={styles.image} />

      {!!chat.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chat.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user?.username}</Text>
          <Text style={styles.text}>{time}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {lastMessage?.message}
        </Text>
      </View>
    </Pressable>
  );
}
