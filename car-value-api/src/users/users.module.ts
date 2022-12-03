import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Module({
  // Creates repo for us for free by creating entity file
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule { }
