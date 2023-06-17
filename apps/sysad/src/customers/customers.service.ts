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
    private groupService: CustomerGroupsService,
  ) {}

  async createCustomer(customerDto: CreateCustomerDto) {
    const group = await this.groupService.getById(customerDto.groupId);
    if (!group) {
      throw new NotFoundException('groupId is invalid');
    }
    const email = customerDto.email;
    const validateEmail = await this.isEmailExisted(email);
    if (validateEmail)
      throw new BadRequestException('customer email already existed');
    // Hash the password together
    const hashedPsw = await this.hashPassword(customerDto.password);
    // Create a new user and save it
    customerDto.password = hashedPsw;
    const newCustomer = this.customerRepo.create(customerDto);
    newCustomer.group = group;
    return this.customerRepo.save(newCustomer);
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async listCustomers() {
    const customers = await this.customerRepo
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.group', 'group')
      .orderBy('customer.id')
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
      .where({ id })
      .getOne();
    if (!customer) throw new NotFoundException('customer not found');
    return customer;
  }

  async updateCustomer(id: number, attrs: any) {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) throw new NotFoundException('user not exists');
    if (this.isEmailExisted(attrs.email) && attrs.email !== customer.email)
      throw new BadRequestException('customer email already existed');
    Object.assign(customer, attrs);
    const updatedUser = await this.customerRepo.save(customer);
    return updatedUser;
  }

  async isEmailExisted(email: string) {
    if (!email) throw new BadRequestException('email is not provided');
    const user = await this.customerRepo.findOneBy({ email });
    if (user) return true;
    return false;
  }
}
