import { CanActivate, ExecutionContext } from '@nestjs/common';

// CanActive ensures we implement a guard correctly
// This help forbid users from certain routes they shouldn't have access to
export class AuthGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    // Check for the existence of a userId in the req
    const req = context.switchToHttp().getRequest();
    return req.session.userId;
  }
}
