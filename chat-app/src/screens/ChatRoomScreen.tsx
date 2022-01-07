import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/core';

import Message from '../components/Message';
import MessageInput from '../components/MessageInput';

import { ChatRoomScreenRouteProp } from '../../types';
import { useSocket } from '../contexts/socket';
import { get, post, postAttachment } from '../api';
import { useAuth } from '../hooks/Auth';
import { ImageInfo } from 'expo-image-picker';

export default function ChatRoomScreen() {
  const route = useRoute<ChatRoomScreenRouteProp>();
  const { id: chatId } = route.params;
  const [messages, setMessages] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(true);
  const listRef = useRef<any>();
  const { authData } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('message', messageListener);

    return () => {
      socket.off('message', messageListener);
    };
  }, []);

  useEffect(() => {
    loadMessages();
  }, [chatId]);

  const messageListener = (message: any) => {
    setMessages((prevMessages: any) => [message, ...prevMessages]);
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

  const makeRequest = (message: string, image: ImageInfo) => {
    if (!image) {
      return post(`chat/${chatId}`, { message }, authData?.token);
    }

    let localUri = image.uri;
    let filename = localUri.split('/').pop() as string;
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const blob: any = { uri: localUri, name: filename, type };
    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', blob);

    return postAttachment(`chat/${chatId}`, formData, authData?.token);
  }

  const handleSubmit = async ({ message, image }: { message: string, image: ImageInfo }) => {
    try {
      const response = await makeRequest(message, image);

      if (!response?.success) {
        // TODO: handle error
      }
    } catch (error) {
      console.log('error', error)
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
