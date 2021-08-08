import { Injectable } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';

@Injectable()
export class ExpoNotificationService {
  async testExpoNotification(): Promise<void> {
    const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    console.log(expo);
    const messages = [];
    const pushToken = 'ExponentPushToken[TYLVCyL5sT0jwMsomv0flr]';
    messages.push({
      to: pushToken,
      sound: 'default',
      body: 'This is a test notification',
      data: { withSome: 'data' },
    });

    (async () => {
      try {
        const chunks = await expo.sendPushNotificationsAsync(messages);
        console.log(chunks);
      } catch (error) {
        console.error(error);
      }
    })();

    return null;
  }
}
