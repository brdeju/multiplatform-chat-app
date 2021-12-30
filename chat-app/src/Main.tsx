import React, { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Subscription } from 'expo-modules-core';
import { Loading } from './components/Loading';
import { useAuth } from './hooks/Auth';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Main() {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const colorScheme = useColorScheme();
  const { loading } = useAuth();
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  // useEffect(() => {
  //   getPushToken().then((pushToken) => {
  //     console.log('pushToken', pushToken)
  //     setExpoPushToken(pushToken);
  //     if (pushToken) {
  //       // retrieveWeatherSubscription(pushToken, setIsSubscribed);
  //     }
  //   }).catch(() => {});

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener(setNotification);

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       setNotification(response.notification);
  //     }
  //   );

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(notificationListener.current);
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Navigation colorScheme={colorScheme} />
  );
}

const getPushToken = () => {
  if (!Device.isDevice) {
    return Promise.reject('Must use physical device for Push Notifications');
  }

  try {
    return Notifications.getPermissionsAsync()
      .then((statusResult) => {
        return statusResult.status !== 'granted'
          ? Notifications.requestPermissionsAsync()
          : statusResult;
      })
      .then((statusResult) => {
        if (statusResult.status !== 'granted') {
          throw 'Failed to get push token for push notification!';
        }
        return Notifications.getExpoPushTokenAsync();
      })
      .then((tokenData) => tokenData.data);
  } catch (error) {
    return Promise.reject("Couldn't check notifications permissions");
  }
};
