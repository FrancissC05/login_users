import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
/*
@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization token missing or malformed');
        }

        const token = authHeader.split(' ')[1];

        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('JWT_SECRET is not defined in environment');
            }

            const decoded = jwt.verify(token, secret);
            req['user'] = decoded; 

            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
*/