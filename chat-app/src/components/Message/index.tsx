import React, { useState, useEffect } from 'react';
import { Text, Pressable, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment';
import { useAuth } from '../../auth/Auth';
import styles from './styles';

const Message = ({ message: propMessage }: any) => {
  const { user } = useAuth();
  const [message, setMessage] = useState<any>(propMessage);
  const [isMe, setIsMe] = useState<boolean | null>(null);

  useEffect(() => {
    setMessage(propMessage);
    setIsMe(message.userid === user.userid);
  }, [propMessage]);

  // TODO: merge following message from same user

  return (
    <Pressable style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
      <UserAvatar size={40} name={user?.username} src={user?.imageUri} style={styles.image} />

      <View style={[styles.message, isMe ? styles.rightMessage : styles.leftMessage]}>
        <Text style={{ fontSize: 16, color: isMe ? 'black' : 'white' }}>{message.message}</Text>

        <Text style={{ fontSize: 12, color: isMe ? 'gray' : 'lightgray' }}>{moment(message.sentAt).from(moment())}</Text>
        {/* TODO: read by */}
        {/* {isMe && <Ionicons name="checkmark" size={16} color="gray" style={{ marginHorizontal: 5 }} />} */}
      </View>
    </Pressable>
  );
};

export default Message;