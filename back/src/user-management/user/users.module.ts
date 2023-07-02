import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UserService } from './users.service';
import {MailService} from "../../mail/mail.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UserService, MailService],
  exports: [UserService]
})
export class UserModule {}
