import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";

@Module({
  //this step is what creates repository for us
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  //A Provider in NestJS is essentially any class or value that can be
  // injected into another class (like a service or controller) using dependency injection.
  providers: [UsersService, AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass:CurrentUserInterceptor
    },
  ] // anything that can be injected into other classes

})
export class UsersModule {}
