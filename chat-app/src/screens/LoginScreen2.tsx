import React, { useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { post } from '../api';
import { useAuth } from '../hooks/Auth';

export const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const handleLogIn = async () => {
    setLoading(true);
    console.log('log in', { username, password })
    const response = await post('login/1');
    await auth?.signIn?.({ token: response.token, ...response.user });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Sign In" onPress={handleLogIn} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1d1d1',
  },
});

export default LoginScreen;
