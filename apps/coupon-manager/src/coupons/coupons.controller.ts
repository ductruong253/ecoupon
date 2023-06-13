import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '../guards/session.guard';
import { CurrentCustomer } from '../customers/decorators/current-customer.decorator';
import { Customer } from '@app/common';
import { CreateCouponInfoDto } from 'apps/coupon-service/src/coupon-info/dtos/create-coupon-info.dto';

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
  @UseGuards(AuthGuard('jwt'))
  async createCoupon(
    @CurrentCustomer() user: Customer,
    @Body() createDto: CreateCouponInfoDto,
  ) {
    const coupon = await this.couponsService.createCoupon(createDto, user);
    return { coupon: coupon };
  }
}
