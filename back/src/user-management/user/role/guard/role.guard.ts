import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Role } from '../../role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private role: Role,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const currentUser = context.switchToHttp().getRequest().user ?? null;

    if (this.role === currentUser.role) {
      return true;
    }

    throw new ForbiddenException('Unauthorized');  
  }
}


