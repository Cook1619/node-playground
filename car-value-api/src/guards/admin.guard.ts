import { CanActivate, ExecutionContext } from '@nestjs/common';

// CanActive ensures we implement a guard correctly
// This help forbid users from certain routes they shouldn't have access to based on admin boolean
export class AdminGuard implements CanActivate {
  constructor() {}
  //wrapper around incoming requests
  canActivate(context: ExecutionContext): boolean {
    // Check for the existence of a userId in the req
    const req = context.switchToHttp().getRequest();
    if (!req.currentUser) {
      return false;
    }
    return req.currentUser.admin;
  }
}
