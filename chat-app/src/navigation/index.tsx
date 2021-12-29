import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';
import { useAuth } from '../hooks/Auth';
import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const {authData} = useAuth();

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {authData ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
