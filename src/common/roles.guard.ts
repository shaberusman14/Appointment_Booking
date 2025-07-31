import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true; // No roles needed → allow

    const request = context.switchToHttp().getRequest();
    const user = request.user; // comes from JwtStrategy.validate()

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied: insufficient role');
    }

    return true;
  }
}
