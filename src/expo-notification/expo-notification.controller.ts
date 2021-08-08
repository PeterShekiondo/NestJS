import { Controller, Post } from '@nestjs/common';
import { ExpoNotificationService } from './expo-notification.service';

@Controller('expo-notification')
export class ExpoNotificationController {
  constructor(private expoNotification: ExpoNotificationService) {}

  @Post('/notificatioin')
  sendNotfication(): Promise<void> {
    return this.expoNotification.testExpoNotification();
  }
}
