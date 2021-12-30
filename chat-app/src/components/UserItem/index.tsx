import React, { useMemo } from 'react';
import { Text, View, Pressable } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { getFile } from '../../api';

// import { User, ChatRoom, ChatRoomUser } from '../../models';

import { stringToColour } from '../../helpers/colors';
import styles from './styles';

export default function UserItem({ user, onPress }: any) {
  const color = useMemo(() => stringToColour(user?.userid), [user?.userid]);

  return (
    <Pressable onPress={onPress.bind(null, user)} style={styles.container}>
      <UserAvatar
        size={50}
        name={user?.username}
        src={getFile(user?.avatar)}
        bgColor={color}
        style={styles.image}
      />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user?.username}</Text>
        </View>

        {/* TODO: user active status based on lastlogon/lastlogoff */}
      </View>
    </Pressable>
  );
}
