import { Customer } from 'apps/coupon-manager/src/customers/customer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupName: string;

  @Column()
  groupDescription: string;

  @Column()
  phoneNum: string;

  @Column()
  address: string;

  @OneToMany(() => Customer, (customer) => customer.group)
  customers: Customer[];
}
