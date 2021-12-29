import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/Auth';

export default function SignOutScreen() {
  const { signOut } = useAuth()

  useEffect(() => {
    signOut();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signing out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
