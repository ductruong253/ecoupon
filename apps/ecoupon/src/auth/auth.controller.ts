import { Body, Controller, Post, Session } from '@nestjs/common';
import { CreateEcouponUserDto } from './dtos/create-ecoupon-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateEcouponUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginDto: UserLoginDto, @Session() session: any) {
    const payload = this.authService.login(loginDto);
    session.userId = (await payload).user.id;
    return { 'access_token': (await payload).access_token };
  }
}
