import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'apps/sysad/src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('email already existed');
    }
    // Hash the password together
    const hashedPsw = await this.hashPassword(password);
    // Create a new user and save it
    const newUser = await this.usersService.create(email, hashedPsw);
    // return the user
    return newUser;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user.id,
    };
    const validUser = await this.validateUser(user.email, user.password);
    if (validUser) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('invalid credential');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
