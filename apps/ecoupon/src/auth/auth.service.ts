import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateEcouponUserDto } from './dtos/create-ecoupon-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateEcouponUserDto) {
    const email = createUserDto.email;
    const password = createUserDto.password;
    // See if email is in use
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('email already existed');
    }
    // Hash the password together
    createUserDto.password = await this.hashPassword(password);
    // Create a new user and save it
    const newUser = await this.usersService.create(createUserDto);
    // return the user
    return newUser;
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  private async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
