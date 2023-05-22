import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { Customer } from 'apps/coupon-manager/src/customers/customer.entity';
import { CustomersService } from 'apps/coupon-manager/src/customers/customers.service';
import { CustomersModule } from 'apps/coupon-manager/src/customers/customers.module';
import { CustomerGroupsService } from 'apps/coupon-manager/src/customer-groups/customer-groups.service';
import { CustomerGroup } from 'apps/coupon-manager/src/customer-groups/customer-groups.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, CustomerGroup]),
    CustomersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CustomersService,
    LocalStrategy,
    CustomerGroupsService,
  ],
})
export class AuthModule {}
