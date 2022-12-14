import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

// This goes into the Express namespace and overrides some typing to say there maybe a curentUser object of type User
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    // if a userId is found
    if (userId) {
      const user = await this.usersService.findOne(userId);
      // We can get access to the req object inside our customer decorator
      req.currentUser = user;
    }
    // Continue on running the route handler
    next();
  }
}
