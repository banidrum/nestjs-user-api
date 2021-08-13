import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service'
import { User } from './entity/user.entity';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IMessage } from './interfaces/IMessage';

@Controller('users')
export default class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @ApiResponse({
        status: 201,
        description: "Created user succesfully",
        type: User
    })
    @ApiBadRequestResponse({
        description: "Something went wrong with the user creation"
    })
    @Post('')
    createUser(@Body() user: User) {
        return this.userService.createUser(user);
    } 

    @ApiOkResponse({
        description: "User object",
        type: User,
        isArray: true
    })
    @ApiBadRequestResponse({
        description: "Something went wrong with the users retrieval"
    })
    @Get('')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    } 

    @ApiOkResponse({
        type: User
    })
    @ApiBadRequestResponse({
        description: "Something went wrong with the user retrieval"
    })
    @Get('/:id')
    getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }
    
    @ApiBearerAuth()
    @ApiNotFoundResponse({
        description: "User not found"
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized"
    })
    @ApiBadRequestResponse({
        description: "Something went wrong with the user retrieval by id"
    })
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    updateUser(@Body() user: User, @Param('id') id: string) {
        return this.userService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: "Unauthorized"
    })
    @ApiBadRequestResponse({
        description: "Something went wrong with the user deletion"
    })
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id: string): IMessage {
        return this.userService.deleteUser(id);
    }

    @ApiResponse({
        status: 201,
        description: "Returns a bearer token for the user"
    })
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() user: User) {
        return this.authService.login(user);
    }
}