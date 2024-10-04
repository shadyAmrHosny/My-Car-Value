import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";

@Module({
  //SQLite is a file based database
  //that is meaning it's going to store all info related to ur DB inside of one single file
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: true,

  }),
    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
