import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
//import { JwtAuthMiddleware } from './auth/jwt-auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {//implements NestModule {
  /*configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware) 
      .exclude(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.POST },
      )
      .forRoutes('users');
  }*/
}
