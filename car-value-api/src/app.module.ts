import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
  imports: [
    ConfigModule.forRoot({
      // makes is assesible everywhere in app
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      // registers config service to DI object
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // setting up global pipe from inside app module so e2e testing is easier
    {
      provide: APP_PIPE,
      // Whitelist true strips off any extra fields on an incoming request
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {
  // this will run on every incoming request (middleware)
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['nestjs'],
          // make use of this middleware function on every request (global middleware)
        }),
      )
      .forRoutes('*');
  }
}
