import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    // this makes it so we don't need to write migration scripts, DEV ONLY
    synchronize: true
  })],
  controllers: [AppController],
  providers: [
    AppService,
    // setting up global pipe from inside app module so e2e testing is easier
    {
      provide: APP_PIPE,
      // Whitelist true strips off any extra fields on an incoming request
      useValue: new ValidationPipe({ whitelist: true })
    }
  ],
})
export class AppModule {
  // this will run on every incoming request (middleware)
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: ['nestjs']
      // make use of this middleware function on every request (global middleware)
    })).forRoutes('*')
  }
}
