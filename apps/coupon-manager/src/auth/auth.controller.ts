import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCustomerDto } from 'apps/coupon-manager/src/customers/dtos/login-customer.dto';
import { SessionGuard } from 'apps/coupon-manager/src/guards/session.guard';
import { CurrentCustomer } from 'apps/coupon-manager/src/customers/decorators/current-customer.decorator';
import { Customer } from '@app/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginCustomerDto, @Session() session: any) {
    const payload = await this.authService.login(loginDto);
    session.customerId = payload.customer.id;
    return { access_token: payload.access_token };
  }

  //for testing
  @Get('/whoami')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  whoAmI(@CurrentCustomer() user: Customer) {
    return user;
  }
}
