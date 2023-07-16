import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user-management/user/users.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        private readonly usersService: UserService
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const apiKey = authHeader.split(' ')[1];

        const user = await this.usersService.findByApiKey(apiKey);

        if (!user) {
            throw new UnauthorizedException('Invalid API key');
        }

        return true;
    }
}