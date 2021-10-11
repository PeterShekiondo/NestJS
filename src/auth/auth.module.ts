import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './entity&repository/user.repository';
import { JwtStrategy } from './jwtStrategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // import and register passportModule
    JwtModule.register({
      secret:
        'petercelinatwalhiyamariamimafahad457934*&(*#$(*3749837284jkehgeb7cyq7647qcv6c67q45c7q54c7w654c7q65v4c7qcb6c7c6gfvw76c4rcq5rc768345r367cr5765r4q375&^%&^%^&$V&6db7s6f',
      signOptions: {
        expiresIn: 3600,
      },
    }), //import and register JwtModule and configure secret and expiration time.
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule], // export modules so they may be able to be used by other modules
})
export class AuthModule {}
