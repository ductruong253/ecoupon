import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerGroup } from './customer-groups.entity';
import { Repository } from 'typeorm';
import { CreateUserGroupDto } from './dtos/create-user-group.dto';

@Injectable()
export class CustomerGroupsService {
    constructor(@InjectRepository(CustomerGroup) private repo: Repository<CustomerGroup>) {}

    create(createGroupdto: CreateUserGroupDto) {
        const group = this.repo.create(createGroupdto);
        return this.repo.save(group);
    }

    async listUserGroups() {
        const groups = await this.repo.find()
        return groups;
    }

    async getById(id: number) {
        if (!id) {
            return null;
        }
        return await this.repo.findOneBy({id})
    }
}
