import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { RoleRepository } from '../roles/repositories/role.repository';


@Injectable()
export class UsersService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly roleRepo: RoleRepository, 
    ) {}

    async findAll(): Promise<UserEntity[]> {
        const users = await this.userRepo.findAll();
        return users.map((u) => new UserEntity(u));
    }

    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepo.findOne(id);

        if (!user) {
            throw new BadRequestException(`User with id ${id} not found`);
        }

        return user; 
    }
    
    /*
    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepo.findOne({
            where: { id },
            include: {
                Role: true,
            },
        });

        if (!user) {
            throw new BadRequestException(`User with id ${id} not found`);
        }

        return new UserEntity(user); 
    }*/

    async create(dto: CreateUserDto): Promise<UserEntity> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const existingRoles = await this.roleRepo.findManyByIds(dto.roles);

        const notFoundRoles = dto.roles.filter(
            (id) => !existingRoles.some((role) => role.id === id),
        );

        if (notFoundRoles.length > 0) {
            throw new BadRequestException(
                `The following role(s) do not exist: ${notFoundRoles.join(', ')}`,
            );
        }

        const data: any = {
            email: dto.email,
            username: dto.username,
            password: hashedPassword,
            firstName: dto.firstName,
            lastName: dto.lastName,
            Role: {
                connect: dto.roles.map((roleId) => ({ id: roleId })),
            },
        };

        if (dto.isActive !== undefined) {
            data.isActive = dto.isActive;
        }

        const user = await this.userRepo.create(data);

        return new UserEntity(user);
    }

    async findByEmail(email: string) {
        return this.userRepo.findByEmail(email);
    }
}
