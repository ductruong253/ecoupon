import { IsDate, IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { CouponTypeEnum } from '../enums/coupon-type.enum';
import { CurrencyEnum } from '../enums/currency.enum';
import { Type } from 'class-transformer';
import { CouponStatusEnum } from '../enums/coupon-status.enum';

export class UpdateCouponInfoDto {
  @IsString()
  description: string;

  @IsString()
  vendorCode: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  couponCode: string;

  @IsNumber()
  voucherLimit: number;

  @IsString()
  conditions: string;

  @IsEnum(CouponTypeEnum)
  type: CouponTypeEnum;

  @IsEnum(CouponStatusEnum)
  status: CouponStatusEnum;

  @IsNumber()
  maxDiscountValue: number;

  @IsEnum(CurrencyEnum)
  unit: CurrencyEnum;

  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercent: number;
}
