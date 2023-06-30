import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user-management/user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/user-management/user/users.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<Users> | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ email, password }: { email: string, password: string }): Promise<{ access_token: string }> {
    const user : Partial<Users> = await this.validateUser(email, password);
    if(!user) throw new Error('User not found');

    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
