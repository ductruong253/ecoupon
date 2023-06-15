import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
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
  @IsOptional()
  voucherLimit: number;

  @IsString()
  conditions: string;

  @IsEnum(CouponTypeEnum)
  type: CouponTypeEnum;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  maxDiscountValue: number;

  @IsEnum(CurrencyEnum)
  @IsOptional()
  unit: CurrencyEnum;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  @IsOptional()
  discountPercent: number;
}