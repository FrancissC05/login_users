import {User, Role} from '@prisma/client';

export function mapUserOutput(user: User & { Role: Role[] }) {

    const { password, Role, ...userWithoutPassword } = user; 

    return {
        id: userWithoutPassword.id,
        firstName: userWithoutPassword.firstName,
        lastName: userWithoutPassword.lastName,
        username: userWithoutPassword.username,
        email: userWithoutPassword.email,
        isActive: userWithoutPassword.isActive,
        createdAt: userWithoutPassword.createdAt,
        updatedAt: userWithoutPassword.updatedAt,
        roles: Role?.map((role) => ({
            id: role.id,
            name: role.name,
        })) || []
    };
}
export function mapUserListOutput(users: (User & { Role: Role[] })[]) {
    return users.map(mapUserOutput);
}