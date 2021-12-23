import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Constants from 'expo-constants';

// import { User } from '../models';
import UserItem from '../components/UserItem';
import { useAuth } from '../auth/Auth';

const HTTP_GET: any = {
  method: 'GET',
  mode: 'cors',
}
const HTTP_POST: any = {
  method: 'POST',
  mode: 'cors',
}

export default function UsersScreen() {
  const [users, setUsers] = useState<Array<any>>([]);
  const navigation = useNavigation();
  const { token, user: currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${Constants.manifest?.extra?.API_URL}/user/all`, {
        ...HTTP_GET,
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        }),
      });
      const json = await response.json();

      if (!json?.success) {
        setUsers([]);
        // TODO: handle error
        return;
      }
      setUsers(json.users.filter((user: any) => user.userid !== currentUser?.userid));
    })();
  }, []);


  const handlePress = async (user: any) => {
    try {
      const response = await fetch(`${Constants.manifest?.extra?.API_URL}/chat/`, {
        ...HTTP_POST,
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        }),
        body: JSON.stringify({ userIds: [user.userid] })
      });
      const json = await response.json();

      if (!json?.success) {
        // TODO: handle error
        return;
      }

      navigation.navigate('ChatRoom', { id: json.chat.chatId, name: user.username })
    } catch (error) {
      console.log('chat room create error', error)
    }
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} onPress={handlePress} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.userid}
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
