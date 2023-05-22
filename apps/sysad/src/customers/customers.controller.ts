import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService) {}

    @Get('/id/:id')
    @UseGuards(AuthGuard('jwt'))
    async getById(@Param('id') id: string) {
        const customer = await this.customerService.getCustomerById(parseInt(id))
        if (!customer) throw new NotFoundException('customer not found')
        return customer
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createCustomer(@Body() body: CreateCustomerDto) {
        return await this.customerService.createCustomer(body)
    }
}
