import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsInt,
    IsOptional,
    IsBoolean,
    IsArray,
    ArrayMinSize

}from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message: 'Firstname is required'})
    firstName: string;

    @IsString()
    @IsNotEmpty({message: 'Lastname is required'})
    lastName: string;

    @IsString()
    @IsNotEmpty({message: 'Username is required'})
    username: string;

    @IsEmail()
    @IsNotEmpty({message: 'Email is required'})
    email: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsString()
    @MinLength(8)
    @IsNotEmpty({message: 'Password is required'})
    password: string;

    @IsArray()
    @ArrayMinSize(1, { message: 'At least one role is required' })
    @IsInt({ each: true })
    roles: number[];
}