import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomersService } from 'apps/coupon-manager/src/customers/customers.service';
import { LoginCustomerDto } from 'apps/coupon-manager/src/customers/dtos/login-customer.dto';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginCustomerDto) {
    const customer = await this.customerService.getCustomerByEmail(
      loginDto.email,
    );
    if (!customer) throw new UnauthorizedException('invalid credential');
    if (await this.comparePassword(loginDto.password, customer.password)) {
      const payload = { email: customer.email, sub: customer.id };
      return {
        access_token: this.jwtService.sign(payload),
        customer: customer,
      };
    } else throw new UnauthorizedException('invalid credential');
  }

  async validateUser(email: string, password: string) {
    const customer = await this.customerService.getCustomerByEmail(email);
    if (customer && (await this.comparePassword(password, customer.password))) {
      return customer;
    }
    return null;
  }

  private async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
