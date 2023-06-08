import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomerGroupsService } from './customer-groups.service';
import { CreateUserGroupDto } from './dtos/create-user-group.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserGroupDto } from './dtos/update-user-group.dto';

@Controller('customer-groups')
export class CustomerGroupsController {
  constructor(private groupService: CustomerGroupsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUserGroup(@Body() body: CreateUserGroupDto) {
    const group = await this.groupService.create(body);
    return { group: group };
  }

  @Get('/list/all')
  @UseGuards(AuthGuard('jwt'))
  async listAllGroup() {
    const groups = await this.groupService.listUserGroups();
    return { groups: groups };
  }

  @Get('/id/:id')
  @UseGuards(AuthGuard('jwt'))
  async getGroupById(@Param('id') id: string) {
    const group = await this.groupService.getById(parseInt(id));
    if (!group) {
      throw new NotFoundException('group not found');
    }
    return { group: group };
  }

  @Put('/id/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateGroup(@Param('id') id: string, @Body() body: UpdateUserGroupDto) {
    if (parseInt(id) !== body.id)
      throw new BadRequestException('path id and body id not matched');
    const updatedGroup = await this.groupService.update(parseInt(id), body);
    return { group: updatedGroup };
  }
}
