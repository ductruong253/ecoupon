import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'apps/sysad/src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/sysad/src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'apps/sysad/src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule {}
