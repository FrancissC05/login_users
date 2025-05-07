import {PartialType} from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    addRoleIds?: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    removeRoleIds?: number[];
}