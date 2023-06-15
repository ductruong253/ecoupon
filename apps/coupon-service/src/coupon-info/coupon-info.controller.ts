import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CouponInfoService } from './coupon-info.service';
import { Serialize } from 'apps/coupon-service/src/interceptors/serialize.interceptor';
import { CreateCouponInfoDto } from './dtos/create-coupon-info.dto';
import { AuthGuard } from 'apps/coupon-service/src/guards/auth.guard';
import { CouponInfoDto } from './dtos/coupon-info.dto';
import { UpdateCouponInfoDto } from './dtos/update-coupon-info.dto';

@Controller('api/coupon/')
@Serialize(CouponInfoDto)
@UseGuards(AuthGuard)
export class CouponInfoController {
  constructor(private couponInfoService: CouponInfoService) {}

  @Get('vendorCode/:vendorCode/couponCode/:couponCode')
  async findCouponInfoByCode(
    @Param('couponCode') couponCode: string,
    @Param('vendorCode') vendorCode: string,
  ) {
    const couponInfo =
      await this.couponInfoService.findOneByVendorCodeCouponCode(
        vendorCode,
        couponCode,
      );
    if (!couponInfo) {
      throw new NotFoundException('Coupon not found');
    }
    return couponInfo;
  }

  @Get('vendorCode/:vendorCode')
  async findCouponVendorCode(@Param('vendorCode') vendorCode: string) {
    const couponInfo = await this.couponInfoService.findByVendorCode(
      vendorCode,
    );
    if (!couponInfo) {
      throw new NotFoundException('Coupon not found');
    }
    return couponInfo;
  }

  @Post()
  async create(@Body() body: CreateCouponInfoDto) {
    return await this.couponInfoService.create(body);
  }

  @Put()
  async update(@Body() body: UpdateCouponInfoDto) {
    return await this.couponInfoService.updateCouponInfo(body);
  }

  @Put('vendorCode/:vendorCode/couponCode/:couponCode')
  async approveCoupon(
    @Param('couponCode') couponCode: string,
    @Param('vendorCode') vendorCode: string,
  ) {
    return await this.couponInfoService.approveCouponInfo(
      vendorCode,
      couponCode,
    );
  }
}
