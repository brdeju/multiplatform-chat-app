import React, { useMemo } from 'react';
import { Text, View, Pressable } from 'react-native';
import UserAvatar from "react-native-user-avatar";
import moment from 'moment';

// import { User, Message, ChatRoom } from '../../src/models';
import styles from './styles';
import { useAuth } from '../../hooks/Auth';
import { stringToColour } from '../../helpers/colors';
import { getFile } from '../../api';

export default function ChatRoomItem({ chat, onPress }: any) {
  const { authData } = useAuth();
  const { members, lastMessage } = chat;

  const time = lastMessage ? moment(lastMessage?.sentAt).from(moment()) : null;
  const user = members.find((u: any) => u.userid !== authData?.userid);
  const isMe = lastMessage?.userid === authData?.userid;
  const color = useMemo(() => stringToColour(user?.userid), [user?.userid]);

  return (
    <Pressable onPress={onPress.bind(null, chat, user)} style={styles.container}>
      <UserAvatar
        size={50}
        name={user?.username}
        bgColor={color}
        src={getFile(user?.avatar)}
        style={styles.image}
      />

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
          {
            !lastMessage?.message && lastMessage?.attachment ?
              `${isMe ? 'You s' : 'S' }ent image` :
              lastMessage?.message
          }
        </Text>
      </View>
    </Pressable>
  );
}
