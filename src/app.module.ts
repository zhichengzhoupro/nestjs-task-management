import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/tyorm.config";
import { AuthModule } from './auth/auth.module';
import {TodoModule} from "./todos/todo.module";
import {ArticleModule} from "./articles/article.module";
import {ArticleService} from "./articles/article.service";
import moment = require('moment');
import {NotificationModule} from "./notifications/notification.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      TasksModule,
      AuthModule,
      TodoModule,
      ArticleModule,
      NotificationModule

  ],
    providers: [ {
        provide: 'MomentWrapper',
        useValue: moment
    }]
})
export class AppModule {}
