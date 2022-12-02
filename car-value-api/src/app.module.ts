import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    // this makes it so we don't need to write migration scripts, DEV ONLY
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
