import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<UserEntity[]> {
        return this.usersService.findAll();
    }

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
        return this.usersService.create(dto);
    }
    // Usa pipes para sacar el id del usuario de la request y lo pasa a la función findById
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@CurrentUser() user: UserEntity) {
        return user;
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto): Promise<UserEntity> {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return this.usersService.findById(id);
    }
}
