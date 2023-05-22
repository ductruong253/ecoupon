import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'apps/sysad/src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto.email, createUserDto.password);
    }

    @Post('/login')
    async login(@Body() createUserDto: CreateUserDto) {
        return this.authService.login(createUserDto);
    }
}
