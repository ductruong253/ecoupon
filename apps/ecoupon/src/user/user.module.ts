import { Coupon, EcouponUser, GamePlay } from '@app/common';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/local-strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([EcouponUser, GamePlay, Coupon]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy, LocalStrategy],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
