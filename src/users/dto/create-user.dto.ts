import {IsEmail, IsNotEmpty, IsString, MinLength, IsInt, IsOptional, IsBoolean, IsArray, ArrayMinSize, MaxLength} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message: 'Firstname is required'})
    readonly firstName: string;

    @IsString()
    @IsNotEmpty({message: 'Lastname is required'})
    readonly lastName: string;

    @IsString()
    @IsNotEmpty({message: 'Username is required'})
    readonly username: string;

    @IsEmail()
    @IsNotEmpty({message: 'Email is required'})
    readonly email: string;

    @IsOptional()
    @IsBoolean()
    readonly isActive?: boolean;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsNotEmpty({message: 'Password is required'})
    readonly password: string;

    @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: true })
    @JoinTable()
}