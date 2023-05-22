import { CustomerGroup } from "apps/sysad/src/customer-groups/customer-groups.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    email: string

    @Column()
    password: string

    @ManyToOne(() => CustomerGroup, (group) => group.customers)
    group: CustomerGroup
}