import { CurrentUserInterceptor } from './interceptors/create-user.interceptor';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  // Creates repo for us for free by creating entity file
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService,
    // Sets up a globally scoped interceptor so we don't need the decorator over each controller
    // The one downside is if a controller doesn't care about it, it would be over fetching data
    // So if we have lots of controllers this isn't the best practice and should add the inceptor decorators to the controllers that care about this
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ],
})
export class UsersModule { }
