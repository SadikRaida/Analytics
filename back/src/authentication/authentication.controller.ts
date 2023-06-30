import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {UserService} from "../user-management/user/users.service";

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService, private userService: UserService) {}

  @Post('/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() { body }: any) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.id);
  }
}
