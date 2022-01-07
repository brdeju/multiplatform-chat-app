import { Expo } from 'expo-server-sdk';

export default class ExpoPushNotifications {
  static expo: Expo;
  static savedPushTokens: any[] = [];
  static messages: any[] = [];

  static init() {
    this.expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  }

  static handlePushNotification({ title, body }: any) {
    let notifications: any[] = [];
    for (let pushToken of this.savedPushTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      notifications.push({
        to: pushToken,
        sound: "default",
        title: title,
        body: body,
        data: { body }
      });
    }

    let chunks = this.expo.chunkPushNotifications(notifications);

    (async () => {
      for (let chunk of chunks) {
        try {
          let receipts = await this.expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }

  static saveToken(token: string) {
    console.log(token, this.savedPushTokens);
    if (!token) {
      return;
    }

    const exists = this.savedPushTokens.find(t => t === token);
    if (!exists) {
      this.savedPushTokens.push(token);
    }
  }
}
