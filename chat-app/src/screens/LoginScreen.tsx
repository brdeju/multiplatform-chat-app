import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import md5 from 'md5';
import { post } from '../api';
// import { useNavigation } from '@react-navigation/core';

import Loader from '../components/Loader';
import Login from '../components/Login';
import { useAuth } from '../hooks/Auth';

const LoginScreen = () => {
  // const navigation = useNavigation<AuthNavigationProp>();
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any): Promise<{ message: string, success: boolean }> => {
    setLoading(true);
    data.password = md5(data.password);
    const response = await post('login', data);

    if (response?.success) {
      await auth?.signIn?.({ token: response.token, ...response.user });
    } else {
      setLoading(false);
    }

    return {
      success: response?.success,
      message: response?.message,
    }
  }

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Login onSubmit={handleSubmit} />
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
});
