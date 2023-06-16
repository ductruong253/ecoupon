import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  CampaignStatusEnum,
  CampaignTypeEnum,
  CurrencyEnum,
} from '@app/common';

import { Type } from 'class-transformer';

export class CreateCampaignDto {
  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  campaignCode: string;

  @IsString()
  vendorCode: string;

  @IsEnum(CampaignStatusEnum)
  status: CampaignStatusEnum;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  couponLimit: number;

  @IsString()
  conditions: string;

  @IsEnum(CampaignTypeEnum)
  type: CampaignTypeEnum;

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
