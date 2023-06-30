import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constants';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user-management/user/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    try {
      const payload = await this.jwtLogin(token);
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException("Token is invalid");
    }

    return true;
  }

  private extractTokenFromHeader(request: any) {
    if (!request.headers.authorization) {
      return null;
    }
    const token = request.headers.authorization.replace("Bearer ", "");
    return token;
  }

  async jwtLogin(access_token: string) {
    try {
      if (!access_token) {
        throw new Error();
      }

      const data = await this.jwtService.verifyAsync(
        access_token,
        {
          secret: jwtConstants.secret,
        }
      );

      return await this.userService.findByEmail(data.email);
    } catch {
      throw new UnauthorizedException("Token is invalid or expired");
    }
  }

  }

