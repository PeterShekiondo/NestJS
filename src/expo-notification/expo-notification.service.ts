import { Injectable } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';

@Injectable()
export class ExpoNotificationService {
  async testExpoNotification(): Promise<void> {
    const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    console.log(expo);
    const messages = [];
    const pushToken = [
      'ExponentPushToken[R7c-XDKwOqI3QDyOFzg7To]',
      'ExponentPushToken[TYLVCyL5sT0jwMsomv0flr]',
    ];
    messages.push({
      to: pushToken,
      sound: 'default',
      title: 'Tender progress',
      body: 'This is a test notification for tender progress',
      badge: 0,
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
