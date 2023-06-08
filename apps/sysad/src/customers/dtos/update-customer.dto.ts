import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsNumber()
  id: number;

  @IsString()
  fullName: string;

  @IsNumber()
  groupId: number;

  @IsEmail()
  email: string;
}
