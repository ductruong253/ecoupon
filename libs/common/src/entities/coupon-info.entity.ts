import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  ApprovalStatusEnum,
  CouponTypeEnum,
  CurrencyEnum,
  CouponStatusEnum,
} from '../enums';

@Entity()
export class CouponInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  vendorCode: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  createdDate: Date;
  @Column()
  couponCode: string;

  @Column({
    type: 'enum',
    enum: ApprovalStatusEnum,
  })
  approvalStatus: ApprovalStatusEnum;

  @Column()
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: CouponStatusEnum,
  })
  status: CouponStatusEnum;

  @Column()
  currentVoucherCount: number;
  @Column()
  voucherLimit: number;
  @Column()
  conditions: string;

  @Column({
    type: 'enum',
    enum: CouponTypeEnum,
  })
  type: CouponTypeEnum;

  @Column()
  maxDiscountValue: number;

  @Column({
    type: 'enum',
    enum: CurrencyEnum,
  })
  unit: CurrencyEnum;

  @Column()
  discountPercent: number;
  @Column()
  createdBy: number;
}
