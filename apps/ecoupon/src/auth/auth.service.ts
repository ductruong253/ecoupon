import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateEcouponUserDto } from './dtos/create-ecoupon-user.dto';
import { UserLoginDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateEcouponUserDto) {
    const email = createUserDto.email;
    const password = createUserDto.password;
    // See if email is in use
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      throw new BadRequestException('email already existed');
    }
    // Hash the password together
    createUserDto.password = await this.hashPassword(password);
    // Create a new user and save it
    const newUser = await this.userService.create(createUserDto);
    // return the user with token
    const payload = { email: newUser.email, sub: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: newUser,
    };
  }

  async login(loginDto: UserLoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('invalid credential');
    if (this.comparePassword(loginDto.password, user.password)) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        user: user,
      };
    }
    return null;
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  private async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
