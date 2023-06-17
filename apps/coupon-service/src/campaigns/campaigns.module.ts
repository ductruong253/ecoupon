import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignController } from './campaigns.controller';
import { CampaignService } from './campaigns.service';
import { Campaign, Coupon, EcouponUser } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Coupon, EcouponUser])],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
