import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('/list/all')
  async getAllUsers() {
    const customers = await this.customerService.listCustomers();
    return {customers: customers}
  }

  @Get('/id/:id')
  @UseGuards(AuthGuard('jwt'))
  async getById(@Param('id') id: string) {
    const customer = await this.customerService.getCustomerById(parseInt(id));
    if (!customer) throw new NotFoundException('customer not found');
    delete customer.password;
    return { customer: customer };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCustomer(@Body() body: CreateCustomerDto) {
    const customer = await this.customerService.createCustomer(body);
    delete customer.password;
    return { customer: customer };
  }

  @Put("/id/:id")
  @UseGuards(AuthGuard('jwt'))
  async updateCustomer(@Param('id') id: string, @Body() body: UpdateCustomerDto) {
    if (parseInt(id) !== body.id)
      throw new BadRequestException('path id and body id not matched');
    const updateCustomer = await this.customerService.updateCustomer(parseInt(id), body);
    return { customer: updateCustomer };
  }
}
