import React, { useState } from 'react';
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import styles from './styles';

const MessageInput = ({ onSubmit }: any) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    onSubmit(message);
    resetFields();
  };

  const onPlusClicked = () => {
    console.warn('On plus clicked');
  };

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  const resetFields = () => {
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: 'auto' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={message} onChangeText={setMessage} placeholder="Send message..." />
        </View>

        <Pressable onPress={onPress} style={styles.buttonContainer}>
          {message ? <Ionicons name="send" size={18} color="white" /> : <AntDesign name="plus" size={24} color="white" />}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
