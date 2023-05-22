import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CustomerGroupsService } from 'apps/coupon-manager/src/customer-groups/customer-groups.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private repo: Repository<Customer>,
    private groupService: CustomerGroupsService,
  ) {}

  async createCustomer(customerDto: CreateCustomerDto) {
    const group = await this.groupService.getById(customerDto.groupId);
    if (!group) {
      throw new NotFoundException('groupId is invalid');
    }
    const email = customerDto.email;
    const customer = this.repo.findOneBy({ email });
    if (customer)
      throw new BadRequestException('customer email already existed');
    // Hash the password together
    const hashedPsw = await this.hashPassword(customerDto.password);
    // Create a new user and save it
    customerDto.password = hashedPsw;
    const newCustomer = this.repo.create(customerDto);
    newCustomer.group = group;
    return this.repo.save(newCustomer);
  }

  async getCustomerById(id: number) {
    if (!id) {
      return null;
    }
    const customer = await this.repo.findOneBy({ id });
    return customer;
  }

  async getCustomerByEmail(email: string) {
    if (!email) {
      return null;
    }
    const customer = await this.repo.findOneBy({ email });
    return customer;
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
