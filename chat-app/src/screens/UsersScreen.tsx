import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';

// import { User } from '../models';
import { get, post } from '../api';
import UserItem from '../components/UserItem';
import { useAuth } from '../hooks/Auth';

export default function UsersScreen() {
  const [users, setUsers] = useState<Array<any>>([]);
  const [refreshing, setRefreshing] = useState(true);
  const navigation = useNavigation();
  const { authData } = useAuth();

  useEffect(() => {
    loadContacts();
  }, []);


  const handlePress = async (user: any) => {
    try {
      const response = await post('chat', { userIds: [user.userid] }, authData?.token);

      if (!response?.success) {
        // TODO: handle error
        return;
      }

      navigation.navigate('ChatRoom', { id: response.chat.chatId, name: user.username })
    } catch (error) {
      console.log('chat room create error', error)
    }
  };

  const loadContacts = async () => {
    setRefreshing(true);
    const response = await get('user/all', authData?.token);

    if (!response?.success) {
      setUsers([]);
      // TODO: handle error
      return;
    }

    setUsers(response.users.filter((user: any) => user.userid !== authData?.userid));
    setRefreshing(false);
  };

  const handleRefresh = async () => {
    await loadContacts();
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} onPress={handlePress} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.userid}
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
