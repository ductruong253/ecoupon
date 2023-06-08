import { IsEmail, IsString } from 'class-validator';

export class CreateEcouponUserDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;
}
