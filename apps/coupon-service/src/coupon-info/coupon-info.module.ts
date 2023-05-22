import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponInfoController } from './coupon-info.controller';
import { CouponInfoService } from './coupon-info.service';
import { CouponInfo } from './coupon-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponInfo])],
  controllers: [CouponInfoController],
  providers: [CouponInfoService],
})
export class CouponInfoModule {}
