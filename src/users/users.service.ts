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

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { firstName, lastName, roleIds, username, email, password } =
      createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const roles = await this.roleRepo.findManyByIds(roleIds);
    if (!roles || roles.length === 0) {
      throw new BadRequestException(
        `No roles found for the provided IDs: ${roleIds.join(', ')}`,
      );
    }
    const user = await this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
      roleIds,
    });
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }
}
