import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { Coupon, Campaign, EcouponUser } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, Campaign, EcouponUser])],
  providers: [CouponsService],
})
export class CouponsModule {}
