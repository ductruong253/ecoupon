import { Customer } from './customer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  phoneNum: string;

  @Column()
  address: string;

  @OneToMany(() => Customer, (customer) => customer.group)
  customers: Customer[];
}
