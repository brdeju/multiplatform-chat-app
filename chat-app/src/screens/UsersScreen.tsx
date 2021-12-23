import React, { useState, useEffect } from 'react';

import { View, StyleSheet, FlatList } from 'react-native';
// import { User } from '../models';
import UserItem from '../components/UserItem';

export default function UsersScreen() {
  const [users, setUsers] = useState<Array<any>>([])

  useEffect(() => {
    // query users
    (async () => {
      // TODO: fetch users, exclude current sign in user

      setUsers([])
    })()

    return () => {}
  }, [])

  return (
    <View style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
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
