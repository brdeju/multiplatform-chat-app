import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import UserAvatar from 'react-native-user-avatar';
// import { User, ChatRoom, ChatRoomUser } from '../../models';
import styles from './styles';

export default function UserItem({ user }: any) {
  const navigation = useNavigation();

  const onPress = async () => {
    try {
      // get chat room
      // create new chat room if not exists

      // navigation.navigate('ChatRoom', { id: chatroom.id, name: user.name })
    } catch (error) {
      console.log('chat room create error', error)
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <UserAvatar size={50} name={user?.name} src={user?.imageUri} style={styles.image} />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user?.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}
