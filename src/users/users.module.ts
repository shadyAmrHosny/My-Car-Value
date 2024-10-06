import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";

@Module({
  //this step is what creates repository for us
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  //A Provider in NestJS is essentially any class or value that can be
  // injected into another class (like a service or controller) using dependency injection.
  providers: [UsersService, AuthService] // anything that can be injected into other classes

})
export class UsersModule {}
