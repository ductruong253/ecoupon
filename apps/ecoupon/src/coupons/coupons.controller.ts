import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { EcouponUser } from '@app/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '../guards/session.guard';

@Controller('coupons')
export class CouponsController {
  constructor(private couponService: CouponsService) {}

  @Get('/claim')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async claimCoupon(
    @Query('campaignId') campaignId: number,
    @CurrentUser() user: EcouponUser,
  ) {
    const coupon = await this.couponService.createCoupon(user, campaignId);
    return coupon;
  }

  @Get('/inventory')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async getInventory(@CurrentUser() user: EcouponUser) {
    const coupons = await this.couponService.listCouponsClaimed(user);
    return { coupons: coupons };
  }
}
