import { Module } from '@nestjs/common';
import { ExpoNotificationController } from './expo-notification.controller';
import { ExpoNotificationService } from './expo-notification.service';

@Module({
  controllers: [ExpoNotificationController],
  providers: [ExpoNotificationService],
})
export class ExpoNotificationModule {}
