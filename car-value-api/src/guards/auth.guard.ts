import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

// CanActive ensures we implement a guard correctly
export class AuthGuard implements CanActivate {
    constructor() { }
    canActivate(context: ExecutionContext): boolean {
        // Check for the existence of a userId in the req
        const req = context.switchToHttp().getRequest()
        return req.session.userId;
    }
}