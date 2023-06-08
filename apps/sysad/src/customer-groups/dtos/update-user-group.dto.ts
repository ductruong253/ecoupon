import { IsNumber, IsString } from 'class-validator';

export class UpdateUserGroupDto {
  @IsNumber()
  id: number;

  @IsString()
  description: string;

  @IsString()
  phoneNum: string;

  @IsString()
  address: string;
}
