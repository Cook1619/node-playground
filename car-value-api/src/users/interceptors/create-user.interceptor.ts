import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";

// Creating an interceptor with the custom decorator allows up for cleaner code in the controller
// The decorator can't access DI, interceptors can
// All this does is attach the user object to the req
// Interceptor needs to run first before customer decorator
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) { }
    async intercept(context: ExecutionContext, handler: CallHandler) {
        const req = context.switchToHttp().getRequest()
        const { userId } = req.session || {}
        // if a userId is found
        if (userId) {
            const user = await this.usersService.findOne(userId)
            // We can get access to the req object inside our customer decorator
            req.currentUser = user;
        }
        // Continue on running the route handler
        return handler.handle()
    }
}