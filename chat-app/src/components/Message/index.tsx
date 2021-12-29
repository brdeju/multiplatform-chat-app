import React, { useState, useEffect, useMemo } from 'react';
import { Text, Pressable, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment';
import styles from './styles';
import { useAuth } from '../../hooks/Auth';
import { stringToColour } from '../../helpers/colors';

const Message = ({ message: propMessage }: any) => {
  const { authData } = useAuth();
  const [message, setMessage] = useState<any>(propMessage);
  const [isMe, setIsMe] = useState<boolean | null>(null);
  const color = useMemo(() => stringToColour(message?.userid), [message?.userid]);

  useEffect(() => {
    setMessage(propMessage);
    setIsMe(message.userid === authData?.userid);
  }, [propMessage]);

  // TODO: merge following message from same user

  return (
    <Pressable style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
      <UserAvatar
        size={30}
        name={message?.username}
        src={message?.imageUri}
        bgColor={color}
        style={styles.image}
      />

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
