import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import useCachedResources from './src/hooks/useCachedResources';
import SocketProvider from './src/contexts/socket';
import AuthProvider from './src/contexts/auth';
import PushNotificationsProvider from './src/contexts/pushNotifications';
import Main from './src/Main';

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SocketProvider>
        <PushNotificationsProvider>
          <AuthProvider>
            <SafeAreaProvider>
              <Main />
              <StatusBar />
            </SafeAreaProvider>
          </AuthProvider>
        </PushNotificationsProvider>
      </SocketProvider>
    );
  }
}

export default App
