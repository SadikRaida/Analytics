import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SdkModule } from './sdk/sdk.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user-management/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      database: process.env.DB_NAME || 'database',
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      host: process.env.DB_HOST || 'postgresql',
      port: parseInt(process.env.DB_PORT) || 5432,
      autoLoadEntities: true,
      synchronize: true
    }),
    MongooseModule.forRoot(
      'mongodb://root:password@mongo:27017'
      ), //mongodb://<username>:<password>@<host>:<port>/<database>
    SdkModule,
    AuthenticationModule,
    UserModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
