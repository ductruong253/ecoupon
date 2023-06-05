import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, CustomerGroup } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomerGroupsService } from 'apps/coupon-manager/src/customer-groups/customer-groups.service';
import { AuthService } from 'apps/coupon-manager/src/auth/auth.service';
import { JwtStrategy } from 'apps/coupon-manager/src/auth/jwt.strategy';
import { LocalStrategy } from 'apps/coupon-manager/src/auth/local.strategy';
import { CurrentCustomerMiddleware } from './middlewares/current-customer.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, CustomerGroup]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomerGroupsService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class CustomersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentCustomerMiddleware).forRoutes('*');
  }
}
