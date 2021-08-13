import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { AuthService } from '../auth/auth.service';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/providers/database.providers';
import { userProvider } from './providers/user-provider';
// import UserController from './user.controller';

@Module({
    imports: [DatabaseModule],
    providers: [UserService, ...databaseProviders, ...userProvider],
    exports: [UserService, ...userProvider]
})
export class UserModule {}