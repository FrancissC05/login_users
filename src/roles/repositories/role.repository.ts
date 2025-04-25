import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { promises } from 'dns';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<Pick<RoleEntity, 'id' | 'name'>[]> {
        return this.prisma.role.findMany();
    }

    async findManyByIds(ids: number[]) : Promise<Pick<RoleEntity, 'id' | 'name'>[]> {
        return this.prisma.role.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    async create(name: string) {
        return this.prisma.role.create({
            data: {
                name
            },
        });
    }
}