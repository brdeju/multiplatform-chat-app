import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/core';
import Constants from 'expo-constants';

import Message from '../components/Message';
import MessageInput from '../components/MessageInput';

import { ChatRoomScreenRouteProp } from '../../types';
import { useAuth } from '../auth/Auth';
// import { Message as MessageModel } from '../models';

// TODO: move to consts
const HTTP_GET: any = {
  method: 'GET',
  mode: 'cors',
}
const HTTP_POST: any = {
  method: 'POST',
  mode: 'cors',
}

export default function ChatRoomScreen() {
  const route = useRoute<ChatRoomScreenRouteProp>();
  const { name, id: chatId } = route.params;
  const [messages, setMessages] = useState<any>([]);
  const listRef = useRef<any>();
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${Constants.manifest?.extra?.API_URL}/chat/${chatId}`, {
        ...HTTP_GET,
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        }),
      });
      const json = await response.json();
      if (!json?.success) {
        // TODO: set error
        return;
      }
      setMessages(json.messages);
    })();
  }, [chatId]);

  const handleSubmit = async (message: string) => {
    const response = await fetch(`${Constants.manifest?.extra?.API_URL}/chat/${chatId}`, {
      ...HTTP_POST,
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      }),
      body: JSON.stringify({ message })
    });
    const json = await response.json();
    if (!json?.success) {
      // TODO: set error
      return;
    }
    setMessages([
      json.message,
      ...messages,
    ]);
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        ref={listRef}
        data={messages}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => <Message message={item} />}
        keyExtractor={(item: any) => item.messageid}
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
