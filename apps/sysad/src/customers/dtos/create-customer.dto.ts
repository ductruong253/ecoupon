import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateCustomerDto {

    @IsString()
    fullName: string

    @IsNumber()
    groupId: number

    @IsEmail()
    email: string

    @IsString()
    password: string
    
}