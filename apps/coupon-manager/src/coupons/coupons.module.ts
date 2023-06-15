import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { HttpModule } from '@nestjs/axios';
import { CustomersService } from '../customers/customers.service';

@Module({
  imports: [HttpModule],
  controllers: [CouponsController],
  providers: [CouponsService]
})
export class CouponsModule {}
