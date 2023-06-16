import { Expose } from 'class-transformer';
import {
  ApprovalStatusEnum,
  CampaignTypeEnum,
  CurrencyEnum,
  CampaignStatusEnum,
} from '@app/common';

export class CampaignDto {
  @Expose()
  id: number;
  @Expose()
  description: string;
  @Expose()
  vendorCode: string;
  @Expose()
  startDate: Date;
  @Expose()
  endDate: Date;
  @Expose()
  createdDate: Date;
  @Expose()
  campaignCode: string;
  @Expose()
  approvalStatus: ApprovalStatusEnum;
  @Expose()
  status: CampaignStatusEnum;
  @Expose()
  isActive: boolean;
  @Expose()
  currentCouponCount: number;
  @Expose()
  couponLimit: number;
  @Expose()
  conditions: string;
  @Expose()
  type: CampaignTypeEnum;
  @Expose()
  maxDiscountValue: number;
  @Expose()
  unit: CurrencyEnum;
  @Expose()
  discountPercent: number;
  @Expose()
  createdBy: string;
}
