import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SdkModule } from './sdk/sdk.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user-management/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'db_analytics',
          autoLoadEntities: true,
          synchronize: true,
        }),
    SdkModule,
    AuthenticationModule,
    UserModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
