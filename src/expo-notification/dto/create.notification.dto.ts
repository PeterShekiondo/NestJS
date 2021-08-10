import { IsNotEmpty } from 'class-validator';
export class CreateNotificationDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  token: string;
}
