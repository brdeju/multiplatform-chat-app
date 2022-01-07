import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Subscription } from 'expo-modules-core';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const PushNotificationsContext = createContext<any>({
  pushToken: null,
  notification: null,
});

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

export default ({ children }: any) => {
  const [notification, setNotification] = useState<Notifications.Notification>();
  const [pushToken, setPushToken] = useState('');
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    getPushToken().then((pushToken) => {
      console.log('pushToken', pushToken)
      setPushToken(pushToken);
      if (pushToken) {
        // retrieveWeatherSubscription(pushToken, setIsSubscribed);
      }
    }).catch(() => { });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(setNotification);

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        setNotification(response.notification);
      }
    );

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <PushNotificationsContext.Provider value={{ pushToken, notification }}>
      {children}
    </PushNotificationsContext.Provider>
  )
}

export const usePushNotifications = () => {
  const context = useContext(PushNotificationsContext)
  if (!context) {
    throw new Error('usePushNotifications must be inside an PushNotificationsContext with a value')
  }

  return ({ ...context });
}
