import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerGroup } from '@app/common';
import { Repository } from 'typeorm';
import { CreateUserGroupDto } from './dtos/create-user-group.dto';
import { UpdateUserGroupDto } from './dtos/update-user-group.dto';

@Injectable()
export class CustomerGroupsService {
  constructor(
    @InjectRepository(CustomerGroup) private repo: Repository<CustomerGroup>,
  ) {}

  async create(createGroupDto: CreateUserGroupDto) {
    const code = createGroupDto.code;
    const existingGroup = await this.repo.findOneBy({ code });
    if (existingGroup) throw new BadRequestException('group code existed');
    const newGroup = this.repo.create(createGroupDto);
    return this.repo.save(newGroup);
  }

  async update(id: number, attrs: UpdateUserGroupDto) {
    const group = await this.repo.findOneBy({ id });
    if (!group) throw new NotFoundException('group not exists');
    Object.assign(group, attrs);
    const updatedGroup = await this.repo.save(group);
    return updatedGroup;
  }

  async listUserGroups() {
    const groups = await this.repo.find();
    return groups;
  }

  async getById(id: number) {
    if (!id) {
      return null;
    }
    return await this.repo.findOneBy({ id });
  }
}
