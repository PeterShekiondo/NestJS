import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateNotificationDto } from './dto';
import { UserData } from './userdata.entity';

@EntityRepository(UserData)
export class NotificationRepository extends Repository<UserData> {
  async registerUserData(
    createNotificationDto: CreateNotificationDto,
  ): Promise<void> {
    const { id, token } = createNotificationDto;
    const userData = new UserData();
    userData.userid = id;
    userData.token = token;
    try {
      await userData.save();
    } catch (error) {
      if (error.code == 23505) {
        // duplicated value (user name)
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException('');
      }
    }
  }
}
