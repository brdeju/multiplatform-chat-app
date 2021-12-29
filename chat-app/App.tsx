import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import useCachedResources from './src/hooks/useCachedResources';
import SocketProvider from './src/contexts/socket';
import AuthProvider from './src/contexts/auth';
import Main from './src/Main';

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <SocketProvider>
          <SafeAreaProvider>
            <Main />
            <StatusBar />
          </SafeAreaProvider>
        </SocketProvider>
      </AuthProvider>
    );
  }
}

export default App
