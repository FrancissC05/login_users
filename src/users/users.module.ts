import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { RolesModule } from 'src/roles/roles.module';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserEntity]
})
export class UsersModule {}
