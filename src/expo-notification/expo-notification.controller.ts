import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpoNotificationService } from './expo-notification.service';
import { CreateNotificationDto, SendNotificationDto } from './dto';

@Controller('expo-notification')
export class ExpoNotificationController {
  constructor(private expoNotification: ExpoNotificationService) {}

  @Post('/notification')
  @UsePipes(ValidationPipe)
  sendNotfication(
    @Body() sendNotificationDto: SendNotificationDto,
  ): Promise<any> {
    return this.expoNotification.sendExpoNotification(sendNotificationDto);
  }

  // @Post('/register')
  // @UsePipes(ValidationPipe)
  // registerForNotification(@Body() registerForNotificationDto:CreateNotificationDto): Promise<void> {
  //   return null;
  // }
}
