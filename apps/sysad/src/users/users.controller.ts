import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    getUserInfo(@Param('id') id: string) {
        return this.usersService.findOneById(parseInt(id))
    }
}