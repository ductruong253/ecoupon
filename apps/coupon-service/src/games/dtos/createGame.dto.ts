import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  title: string;

  @IsString()
  vendorCode: string;

  @IsArray()
  @IsNumber({}, { each: true })
  gameContent: number[];
}
