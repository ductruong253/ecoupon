import { Body, Controller, Post } from '@nestjs/common';
import { CreateEcouponUserDto } from './dtos/create-ecoupon-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateEcouponUserDto) {
    return this.authService.signup(createUserDto);
  }
}
