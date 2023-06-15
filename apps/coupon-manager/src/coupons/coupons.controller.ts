import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '../guards/session.guard';
import { CurrentCustomer } from '../customers/decorators/current-customer.decorator';
import { Customer } from '@app/common';
import { CreateCouponInfoDto } from 'apps/coupon-service/src/coupon-info/dtos/create-coupon-info.dto';
import { UpdateCouponDto } from './dtos/updateCoupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private couponsService: CouponsService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async whoAmI(@CurrentCustomer() user: Customer) {
    const coupons = await this.couponsService.fetchCoupons(user);
    return { coupons: coupons };
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async createCoupon(
    @CurrentCustomer() user: Customer,
    @Body() createDto: CreateCouponInfoDto,
  ) {
    const coupon = await this.couponsService.createCoupon(createDto, user);
    return { coupon: coupon };
  }

  @Get('/couponCode/:couponCode')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async getByCode(
    @CurrentCustomer() user: Customer,
    @Param('couponCode') couponCode: string,
  ) {
    const coupon = await this.couponsService.fetchCouponByCode(
      couponCode,
      user,
    );
    return { coupon: coupon };
  }

  @Put()
  async updateCoupon(
    @CurrentCustomer() user: Customer,
    @Body() updateDto: UpdateCouponDto,
  ) {
    const updatedCoupon = await this.couponsService.updateCoupon(
      updateDto,
      user,
    );
    return { coupon: updatedCoupon };
  }
}
