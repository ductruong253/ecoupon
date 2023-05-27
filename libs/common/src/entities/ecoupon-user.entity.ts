import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
