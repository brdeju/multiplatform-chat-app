import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components/native'
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import FormInput from '../Form/FormInput';
import ErrorMessage from '../Form/ErrorMessage';

import styles from './styles'

const StyledView = styled.View`
  marginLeft: 35px;
  marginRight: 35px;
`

type FormValues = {
  email: string;
  password: string;
};

export default function Login({ onSubmit }: any) {
  // const navigation = useNavigation<AuthNavigationProp>();
  const { ...methods } = useForm();
  const [errortext, setErrortext] = useState('');

  const handleSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setErrortext('');
    const response = await onSubmit(data);

    if (!response?.success) {
      setErrortext(response?.message);
    }
  }

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => { };

  return (
    <View>
      <KeyboardAvoidingView enabled>
        {/* TODO: some logo ? */}
        {/* <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../Image/aboutreact.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View> */}

        <FormProvider {...methods}>
          <StyledView>
            <FormInput
              name="email"
              label="Email"
              placeholder="Enter Email"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              blurOnSubmit={false}
              rules={{
                required: 'Email is required!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address!"
                }
              }}
            />
            <FormInput
              name="password"
              label="Password"
              placeholder="Enter Password"
              secureTextEntry={true}
              autoCapitalize="none"
              returnKeyType="next"
              blurOnSubmit={false}
              rules={{ required: 'Password is required!' }}
            />
          </StyledView>
        </FormProvider>

        {!!errortext ? <ErrorMessage>{errortext}</ErrorMessage> : null}

        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={methods.handleSubmit(handleSubmit, onError)}
        >
          <Text style={styles.buttonTextStyle}>LOGIN</Text>
        </TouchableOpacity>

        {/* TODO: register screen */}
        {/* <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Register')}
            >
              New Here ? Register
            </Text> */}
      </KeyboardAvoidingView>
    </View>
  )
}
