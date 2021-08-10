import { IsNotEmpty } from 'class-validator';
export class SendNotificationDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  message: string;
}
