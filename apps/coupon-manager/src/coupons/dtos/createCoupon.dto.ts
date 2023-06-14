import { IsDate, IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { CouponTypeEnum, CurrencyEnum } from '@app/common';

import { Type } from 'class-transformer';

export class CreateCouponDto {
  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  couponCode: string;

  @IsNumber()
  @Type(() => Number)
  voucherLimit: number;

  @IsString()
  conditions: string;

  @IsEnum(CouponTypeEnum)
  type: CouponTypeEnum;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  maxDiscountValue: number;

  @IsEnum(CurrencyEnum)
  unit: CurrencyEnum;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  discountPercent: number;

}