export interface JwtPayload {  //extends UserEntity
    sub: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    roles: string[];
}