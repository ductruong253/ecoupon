import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  ApprovalStatusEnum,
  CampaignTypeEnum,
  CurrencyEnum,
  CampaignStatusEnum,
  CampaignDistribution,
} from '../enums';
import { Coupon } from './coupon.entity';

@Entity()
export class Campaign {
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
  campaignCode: string;

  @Column({
    type: 'enum',
    enum: ApprovalStatusEnum,
  })
  approvalStatus: ApprovalStatusEnum;

  @Column()
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: CampaignStatusEnum,
  })
  status: CampaignStatusEnum;

  @Column()
  currentCouponCount: number;
  @Column({ nullable: true })
  couponLimit: number;
  @Column()
  conditions: string;

  @Column({
    type: 'enum',
    enum: CampaignTypeEnum,
  })
  type: CampaignTypeEnum;

  @Column({ nullable: true })
  maxDiscountValue: number;

  @Column({
    type: 'enum',
    enum: CurrencyEnum,
    nullable: true,
  })
  unit: CurrencyEnum;

  @Column({ nullable: true })
  discountPercent: number;

  @Column()
  createdBy: string;

  @Column({ nullable: true })
  approvedBy: string;

  @OneToMany(() => Coupon, (coupon) => coupon.campaign)
  coupons: Coupon[];

  @Column({type: 'enum', enum: CampaignDistribution, default: CampaignDistribution.INDIVIDUAL})
  distribution: CampaignDistribution;
}
