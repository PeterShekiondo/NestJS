import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../entity&repository/user.entity';
import { UserRepository } from '../entity&repository/user.repository';
import { jwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'petercelinatwalhiyamariamimafahad457934*&(*#$(*3749837284jkehgeb7cyq7647qcv6c67q45c7q54c7w654c7q65v4c7qcb6c7c6gfvw76c4rcq5rc768345r367cr5765r4q375&^%&^%^&$V&6db7s6f',
    });
  }

  async validate(payload: jwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('unAuthorized');
    }

    return user;
  }
}
