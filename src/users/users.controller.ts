import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    // @UseGuards(JwtAuthGuard)
    /*@Get('profile')
    async getProfile(@Req() req: any) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new Error('User ID not found in request payload');
        }

        const user = await this.usersService.findById(userId);
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles.map(r => r.name),
        };
    }*/

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<UserEntity> {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return this.usersService.delete(id);
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<UserEntity> {
        return this.usersService.findById(id);
    }
}
