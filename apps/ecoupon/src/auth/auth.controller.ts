import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { CreateEcouponUserDto } from './dtos/create-ecoupon-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/login-user.dto';
import { EcouponUser } from '@app/common';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '../guards/session.guard';

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
    return { access_token: (await payload).access_token };
  }

  //for testing
  @Get('/whoami')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  whoAmI(@CurrentUser() user: EcouponUser) {
    return user;
  }
}
