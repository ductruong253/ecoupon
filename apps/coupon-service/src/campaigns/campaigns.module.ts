import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignController } from './campaigns.controller';
import { CampaignService } from './campaigns.service';
import { Campaign, Coupon } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Coupon])],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
