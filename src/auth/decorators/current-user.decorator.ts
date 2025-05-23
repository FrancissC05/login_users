import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
    (_, ctx: ExecutionContext): UserEntity => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
