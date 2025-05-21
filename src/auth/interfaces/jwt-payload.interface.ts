import { UserEntity } from "src/users/entities/user.entity";

export interface JwtPayload extends Pick<UserEntity, 'id' | 'email'> {}