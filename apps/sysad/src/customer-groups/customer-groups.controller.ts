import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { CustomerGroupsService } from './customer-groups.service';
import { CreateUserGroupDto } from './dtos/create-user-group.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer-groups')
export class CustomerGroupsController {
    constructor(private groupService: CustomerGroupsService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createUserGroup(@Body() body: CreateUserGroupDto) {
        const group = await this.groupService.create(body)
        return group
    }

    @Get('/list/all')
    @UseGuards(AuthGuard('jwt'))
    async listAllGroup() {
        return this.groupService.listUserGroups() 
    }

    @Get('/id/:id')
    @UseGuards(AuthGuard('jwt'))
    async getGroupById(@Param('id') id: string) {
        const group = await this.groupService.getById(parseInt(id));
        if (!group) {
            throw new NotFoundException('group not found');
        }
        return group
    }
}
