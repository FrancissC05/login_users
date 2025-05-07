import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { RoleRepository } from '../roles/repositories/role.repository';
import { mapUserListOutput, mapUserOutput } from './mappers/user.mapper';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepo.findAll();
    return mapUserListOutput(users);
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    return mapUserOutput(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const {roleIds, ...userInfo} =
      createUserDto;

    const hashedPassword = await bcrypt.hash(userInfo.password, 10);

    const roles = await this.roleRepo.findManyByIds(roleIds);
    if (!roles || roles.length === 0) {
      throw new BadRequestException(
        `No roles found for the provided IDs: ${roleIds.join(', ')}`,
      );
    }
    const user = await this.userRepo.create({
      ...userInfo,
      password: hashedPassword,
      roleIds,
    });
    return mapUserOutput(user);
  }

  async update(id: number, updateDataDto: UpdateUserDto): Promise<UserEntity> {
    
    const { roleIds, addRoleIds, removeRoleIds, password, ...data } = updateDataDto;

    const prismaData = {
      ...data,
      Role:{},
    }

    if (roleIds) {
      const roles = await this.roleRepo.findManyByIds(roleIds);
      if (!roles || roles.length === 0) {
        throw new BadRequestException(
          `No roles found for the provided IDs: ${roleIds.join(', ')}`,
        );
      }
    }

    if(addRoleIds) {
      const roles = await this.roleRepo.findManyByIds(addRoleIds);
      if (!roles || roles.length === 0) {
        throw new BadRequestException(
          `No roles found for the provided IDs: ${addRoleIds.join(', ')}`,
        );
      }

      prismaData.Role = {
        ...(prismaData.Role || {}),
        connect: roles.map((role) => ({ id: role.id })),
      }

    }

    if(removeRoleIds) {
      const roles = await this.roleRepo.findManyByIds(removeRoleIds);
      if (!roles || roles.length === 0) {
        throw new BadRequestException(
          `No roles found for the provided IDs: ${removeRoleIds.join(', ')}`,
        );
      }

      prismaData.Role = {
        ...(prismaData.Role || {}),
        disconnect: roles.map((role) => ({ id: role.id })),
      }
    }

    const user = await this.userRepo.update(id, prismaData);

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    return mapUserOutput(user);
  }


  async delete(id: number){
    const user = await this.userRepo.delete(id);

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    return {message: `User with id ${id} deleted successfully`};
  }

  async findByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }
}
