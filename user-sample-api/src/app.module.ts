import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { databaseProviders } from './database/providers/database.providers';
import { userProvider } from './user/providers/user-provider';
import { DatabaseModule } from './database/database.module';
import UserController from './user/user.controller';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

dotenv.config();

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, ...databaseProviders, ...userProvider],
})
export class AppModule {}
