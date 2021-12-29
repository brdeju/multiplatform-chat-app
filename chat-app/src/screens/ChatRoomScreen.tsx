import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/core';

import Message from '../components/Message';
import MessageInput from '../components/MessageInput';

import { ChatRoomScreenRouteProp } from '../../types';
import { useSocket } from '../contexts/socket';
import { get, post } from '../api';
import { useAuth } from '../hooks/Auth';

export default function ChatRoomScreen() {
  const route = useRoute<ChatRoomScreenRouteProp>();
  const { name, id: chatId } = route.params;
  const [messages, setMessages] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(true);
  const listRef = useRef<any>();
  const { authData } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('message', messageListener);

    return () => {
      socket.off('message', messageListener);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    loadMessages();
  }, [chatId]);

  const messageListener = (message: any) => {
    setMessages((prevMessages: any) => {
      return [message, ...prevMessages];
    });
  };

  const loadMessages = async () => {
    setRefreshing(true);
    const response = await get(`chat/${chatId}`, authData?.token);
    if (!response?.success) {
      // TODO: handle error
      return;
    }

    setMessages(response.messages);
    setRefreshing(false);
  }

  const handleSubmit = async (message: string) => {
    const response = await post(`chat/${chatId}`, { message }, authData?.token);

    if (!response?.success) {
      // TODO: handle error
    }
  };

  const handleRefresh = async () => {
    await loadMessages();
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        ref={listRef}
        data={messages}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => <Message message={item} />}
        keyExtractor={(item: any) => item.messageid}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        inverted={true}
      />
      <MessageInput onSubmit={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
