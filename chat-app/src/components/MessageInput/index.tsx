import React, { useState } from 'react';
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const MessageInput = ({ onSubmit }: any) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<ImagePicker.ImageInfo | null>(null)

  const sendMessage = () => {
    onSubmit({ message, image });
    resetFields();
  };

  const onPress = () => {
    if (message || image) {
      sendMessage();
    }
  };

  const resetFields = () => {
    setMessage('');
    setImage(null);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('result', result)
    if (!result.cancelled) {
      setImage(result);
    }
  };

  const onImageRemove = () => {
    setImage(null);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: 'auto' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.row}>
        {/* TODO: take photo */}

        <Pressable onPress={pickImage} style={styles.addPhotoBtn}>
          <Ionicons name="image" size={18} color="white" />
        </Pressable>

        <View style={styles.messageContainer}>
          {
            image &&
            <View style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <Pressable onPress={onImageRemove} style={styles.removeBtn}>
                <Ionicons name="close" size={14} color="gray" />
              </Pressable>
            </View>
          }

          <View>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Send message..."
              multiline={true}
            />

            <Pressable onPress={onPress} style={styles.sendBtn}>
              <Ionicons name="send" size={14} color="white" />
              {/* TODO: voice message */}
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
