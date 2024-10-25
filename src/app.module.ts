import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";
import cookieSession from "cookie-session";

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
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      // The purpose of this property is to make sure
      // that incoming requests don't have extraneous properties
      //in the body that we are not expecting.
      whitelist: true
    })
  }],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['strToEncryptInfo'],
        }),
      )
      .forRoutes('*');
  }
}
