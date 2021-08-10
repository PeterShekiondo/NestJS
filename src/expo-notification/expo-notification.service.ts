import { Injectable } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';
import { CreateNotificationDto, SendNotificationDto } from './dto';

@Injectable()
export class ExpoNotificationService {
  async sendExpoNotification(
    sendNotificationDto: SendNotificationDto,
  ): Promise<any> {
    const { id, title, message } = sendNotificationDto;
    console.log(id);
    console.log(title);
    console.log(message);

    const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    const messages = [];
    const pushToken = [
      'ExponentPushToken[R7c-XDKwOqI3QDyOFzg7To]',
      'ExponentPushToken[TYLVCyL5sT0jwMsomv0flr]',
    ];
    messages.push({
      to: pushToken,
      sound: 'default',
      title: title,
      body: message,
      badge: 0,
      data: { withSome: 'data' },
    });

    try {
      const chunks = await expo.sendPushNotificationsAsync(messages);
      console.log(chunks);
      return chunks;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
