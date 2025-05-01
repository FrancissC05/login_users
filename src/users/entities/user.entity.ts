export class UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    isActive: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    roles?: { id: string; name: string }[];

    constructor(partial: Partial<UserEntity>) {
        if (partial) {
            if ('password' in partial) {
                delete partial[this.password];
            }
    
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
