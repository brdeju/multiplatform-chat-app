import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, StyleSheet, FlatList } from 'react-native';

// import { ChatRoom } from '../models';
import ChatRoomItem from '../components/ChatRoomItem';
import { useSocket } from '../contexts/socket';
import { get } from '../api';
import { useAuth } from '../hooks/Auth';

export default function ChatsScreen() {
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const navigation = useNavigation();
  const { authData } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('message', messageListener);

    return () => {
      socket.off('message', messageListener);
    };
  }, []);

  useEffect(() => {
    loadChats();
  }, []);

  const handlePress = (chat: any, user: any) => {
    navigation.navigate('ChatRoom', {
      id: chat.chatid,
      name: user.username,
    });
  };

  const loadChats = async () => {
    setRefreshing(true);
    const response = await get('chat', authData?.token);
    if (!response?.success) {
      setChats([]);
      // TODO: handle error
      return;
    }
    setChats(response.conversations);
    setRefreshing(false);
  };

  const handleRefresh = async () => {
    await loadChats();
  };

  const messageListener = async () => {
    console.log('messageListener')
    await loadChats();
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={chats}
        renderItem={({ item }: any) => <ChatRoomItem chat={item} onPress={handlePress} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.chatid}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
