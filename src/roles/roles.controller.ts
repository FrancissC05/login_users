import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Get()
    findAll(): Promise<Pick<RoleEntity, 'id' | 'name'>[]> {
        return this.rolesService.findAll();
    }

    @Post()
    create(@Body() dto: CreateRoleDto): Promise<RoleEntity> {
        return this.rolesService.create(dto);
    }

}


