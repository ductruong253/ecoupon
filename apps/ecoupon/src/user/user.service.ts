import { EcouponUser } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEcouponUserDto } from '../auth/dtos/create-ecoupon-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EcouponUser) private repo: Repository<EcouponUser>,
  ) {}

  create(createUserDto: CreateEcouponUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  getUserByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async getUserById(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.repo.findOneBy({ id });
    return user;
  }
}
