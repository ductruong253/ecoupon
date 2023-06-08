import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, CustomerGroup } from '@app/common';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CustomerGroupsService } from 'apps/sysad/src/customer-groups/customer-groups.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(CustomerGroup)
    private groupRepo: Repository<CustomerGroup>,
    private groupService: CustomerGroupsService,
  ) {}

  async createCustomer(customerDto: CreateCustomerDto) {
    const group = await this.groupService.getById(customerDto.groupId);
    if (!group) {
      throw new NotFoundException('groupId is invalid');
    }
    const email = customerDto.email;
    const customer = await this.customerRepo.findOneBy({ email });
    if (customer)
      throw new BadRequestException('customer email already existed');
    // Hash the password together
    const hashedPsw = await this.hashPassword(customerDto.password);
    // Create a new user and save it
    customerDto.password = hashedPsw;
    const newCustomer = this.customerRepo.create(customerDto);
    newCustomer.group = group;
    return this.customerRepo.save(newCustomer);
  }

  async listCustomers() {
    const customers = await this.customerRepo
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.group', 'group')
      .getMany();
    return customers;
  }

  async getCustomerById(id: number) {
    if (!id) {
      return null;
    }
    const customer = await this.customerRepo
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.group', 'group')
      .where({id})
      .getOne();
    if (!customer) throw new NotFoundException('customer not found')
    return customer;
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
