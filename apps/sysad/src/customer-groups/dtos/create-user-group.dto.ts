import { IsNumber, IsString } from "class-validator";

export class CreateUserGroupDto {

    @IsString()
    groupName: string

    @IsString()
    groupDescription: string

    @IsString()
    phoneNum: string

    @IsString()
    address: string

    @IsNumber()
    groupId: number
}