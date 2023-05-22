import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { JwtModule } from '@nestjs/jwt';
import { CustomerGroupsService } from 'apps/sysad/src/customer-groups/customer-groups.service';
import { CustomerGroup } from 'apps/sysad/src/customer-groups/customer-groups.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, CustomerGroup]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d'
      },
    }),
  ],
  controllers: [CustomersController],
  providers: [CustomersService, CustomerGroupsService]
})
export class CustomersModule {}
