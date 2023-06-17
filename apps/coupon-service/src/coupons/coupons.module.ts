import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign, Coupon, EcouponUser } from '@app/common';
import { CampaignService } from '../campaigns/campaigns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, Campaign, EcouponUser])],
  controllers: [CouponsController],
  providers: [CouponsService, CampaignService],
})
export class CouponsModule {}
