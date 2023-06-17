import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'apps/sysad/src/auth/jwt.strategy';
import { AuthService } from 'apps/sysad/src/auth/auth.service';
import { LocalStrategy } from 'apps/sysad/src/auth/local.strategy';
import { Coupon, GamePlay } from '@app/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Coupon, GamePlay]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy, LocalStrategy],
})
export class UsersModule {}
