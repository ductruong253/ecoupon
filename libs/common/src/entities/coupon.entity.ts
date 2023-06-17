import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EcouponUser } from "./ecoupon-user.entity";
import { Campaign } from "./campaign.entity";

@Entity()
export class Coupon {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => EcouponUser, (user) => user.coupons)
    user: EcouponUser;

    @ManyToOne(() => Campaign, (campaign) => campaign.coupons)
    campaign: Campaign;

    @Column({ type: 'timestamp with time zone' })
    claimedAt: Date
}