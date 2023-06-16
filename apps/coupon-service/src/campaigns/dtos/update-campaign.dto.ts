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
  CampaignTypeEnum,
  CurrencyEnum,
  CampaignStatusEnum,
} from '@app/common';
import { Type } from 'class-transformer';

export class UpdateCampaignDto {
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
  campaignCode: string;

  @IsNumber()
  @IsOptional()
  couponLimit: number;

  @IsString()
  conditions: string;

  @IsEnum(CampaignTypeEnum)
  type: CampaignTypeEnum;

  @IsEnum(CampaignStatusEnum)
  status: CampaignStatusEnum;

  @IsNumber()
  @IsOptional()
  maxDiscountValue: number;

  @IsEnum(CurrencyEnum)
  @IsOptional()
  unit: CurrencyEnum;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discountPercent: number;

  @IsString()
  @IsOptional()
  approvedBy: string;
}
