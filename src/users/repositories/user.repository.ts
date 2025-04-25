import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany({
            include: {
                Role: true,
            },
        });
    }

    async findOne(id: number){
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                Role: true,
            },
        });
    }

    async create(data: any) {

        return this.prisma.user.create({
            data,
            include: {
                Role: true,
            },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            include: {
                Role: true,
            },
        });
    }
}
