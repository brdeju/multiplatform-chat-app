import React from 'react';
import { Text, View, Pressable } from 'react-native';
import UserAvatar from 'react-native-user-avatar';

// import { User, ChatRoom, ChatRoomUser } from '../../models';

import styles from './styles';

export default function UserItem({ user, onPress }: any) {

  return (
    <Pressable onPress={onPress.bind(null, user)} style={styles.container}>
      <UserAvatar size={50} name={user?.username} src={user?.imageUri} style={styles.image} />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user?.username}</Text>
        </View>

        {/* TODO: user active status based on lastlogon/lastlogoff */}
      </View>
    </Pressable>
  );
}
