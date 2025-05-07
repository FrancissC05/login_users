export class UserEntity {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    isActive: boolean;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    roles?: { id: number; name: string }[];

    constructor(partial: Partial<UserEntity>) {
        if (partial) {
    
            if ('Role' in partial && Array.isArray(partial['Role'])) {
                this.roles = partial['Role'].map((role: any) => ({
                    id: role.id,
                    name: role.name,
                }));
                delete partial['Role'];
            }
        }
        Object.assign(this, partial);
    }
}
