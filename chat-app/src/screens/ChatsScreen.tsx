import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';

// import { ChatRoom } from '../models';
import ChatRoomItem from '../components/ChatRoomItem';
import { useAuth } from '../auth/Auth';

const HTTP_GET: any = {
  method: 'GET',
  mode: 'cors',
}

export default function ChatsScreen() {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const { token, user: currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${Constants.manifest?.extra?.API_URL}/chat`, {
        ...HTTP_GET,
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        }),
      });
      const json = await response.json();

      if (!json?.success) {
        setChats([]);
        // TODO: handle error
        return;
      }
      setChats(json.conversations);
    })();
  }, []);

  const handlePress = (chat: any, user: any) => {
    navigation.navigate('ChatRoom', {
      id: chat.chatid,
      name: user.username,
    });
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={chats}
        renderItem={({ item }: any) => <ChatRoomItem chat={item} onPress={handlePress} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.chatid}
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
