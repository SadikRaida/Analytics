import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { Users } from 'src/user-management/user/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super();
  }

  async validate(identifier: string, password: string): Promise<Partial<Users>>  {
    const user = await this.authService.validateUser(identifier, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
}
