import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CouponTypeEnum, CurrencyEnum, CouponStatusEnum } from '@app/common';
import { Type } from 'class-transformer';

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

  @IsString()
  @IsOptional()
  approvedBy: string;
}
