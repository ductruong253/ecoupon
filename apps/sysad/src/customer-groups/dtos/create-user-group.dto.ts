import { IsNumber, IsString } from 'class-validator';

export class CreateUserGroupDto {
  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsString()
  phoneNum: string;

  @IsString()
  address: string;
}
