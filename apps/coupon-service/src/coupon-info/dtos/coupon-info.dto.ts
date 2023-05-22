import { Expose, Transform } from 'class-transformer';
import { ApprovalStatusEnum } from '../enums/approval-status.enum';
import { CouponTypeEnum } from '../enums/coupon-type.enum';
import { CurrencyEnum } from '../enums/currency.enum';
import { CouponStatusEnum } from '../enums/coupon-status.enum';

export class CouponInfoDto {
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
  couponCode: string;
  @Expose()
  approvalStatus: ApprovalStatusEnum;
  @Expose()
  status: CouponStatusEnum;
  @Expose()
  isActive: boolean;
  @Expose()
  currentVoucherCount: number;
  @Expose()
  voucherLimit: number;
  @Expose()
  conditions: string;
  @Expose()
  type: CouponTypeEnum;
  @Expose()
  maxDiscountValue: number;
  @Expose()
  unit: CurrencyEnum;
  @Expose()
  discountPercent: number;
  @Expose()
  createdBy: string;
}
