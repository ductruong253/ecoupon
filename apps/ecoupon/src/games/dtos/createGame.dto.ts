import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  vendorCode: string;

  @IsArray()
  @IsNumber({}, { each: true })
  gameContent: number[];
}
