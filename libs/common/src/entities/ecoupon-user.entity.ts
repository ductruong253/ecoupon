import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coupon } from './coupon.entity';
import { GamePlay } from './gameplay.entity';

@Entity()
export class EcouponUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Coupon, (coupon) => coupon.user)
  coupons: Coupon[];

  @OneToMany(() => GamePlay, (gamePlay) => gamePlay.user)
  gamePlays: GamePlay[];
}
