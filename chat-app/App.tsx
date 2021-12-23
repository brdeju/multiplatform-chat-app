import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import useCachedResources from './src/hooks/useCachedResources';
import AuthProvider from './src/auth/AuthProvider';
import Main from './src/Main';

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <SafeAreaProvider>
          <Main />
          <StatusBar />
        </SafeAreaProvider>
      </AuthProvider>
    );
  }
}

export default App
