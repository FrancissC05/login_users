import { Injectable } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(private readonly roleRepo: RoleRepository) { }

    async findAll(): Promise<Pick<RoleEntity, 'id' | 'name'>[]> {
        const roles = await this.roleRepo.findAll();
        return roles;
    }

    async create(dto: CreateRoleDto): Promise<RoleEntity> {
        const role = await this.roleRepo.create(dto.name);
        return {
            ...role
        } as RoleEntity;
    }

}