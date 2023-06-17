import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { Coupon, Campaign, EcouponUser } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CouponsController } from './coupons.controller';
import { CampaignsService } from '../campaigns/campaigns.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon, Campaign, EcouponUser]),
    HttpModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [CouponsController],
  providers: [CouponsService, CampaignsService],
})
export class CouponsModule {}
