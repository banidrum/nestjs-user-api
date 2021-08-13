import { Injectable, Inject, NotFoundException, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { IMessage } from './interfaces/IMessage';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly usersRepository: Repository<User>,
    ) {}
    
    private readonly logger = new Logger(UserService.name);

    async createUser(user: User): Promise<IMessage> {
        try {
            this.logger.log("Creating user...");
            
            await this.usersRepository.save(user);
            
            return { message: 'User created succesfully.' };
        } catch(error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Something went wrong"
            }, HttpStatus.BAD_REQUEST)
        }
    }

    getAllUsers(): Promise<User[]> {
        try {
            this.logger.log("Retrieving all users...");
            
            return this.usersRepository.find();
        } catch(error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Something went wrong"
            }, HttpStatus.BAD_REQUEST)
        }
    }

    getUserById(id: string): Promise<User> {
        try {
            this.logger.log("Retrieving user by id...");
            
            return this.usersRepository.findOne(id);
        } catch(error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Something went wrong"
            }, HttpStatus.BAD_REQUEST)
        }
    }

    getUserByEmail(email: string): Promise<User> {
        try {
            this.logger.log("Retrieving user by email...");
            
            return this.usersRepository.findOne({email});
        } catch(error) {
            new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Something went wrong"
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async updateUser(id: string, user: User): Promise<User> {
        try {
            this.logger.log("Updating user...");

            const editedUser = await this.usersRepository.findOne(id);

            if(!editedUser) {
                throw new NotFoundException("User not found");
            }

            editedUser.firstName = user.firstName;
            editedUser.lastName = user.lastName;
            editedUser.address = user.address;
            editedUser.email = user.email;

            await this.usersRepository.save(editedUser);

            return editedUser;
        } catch(error) {
            new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Something went wrong"
            }, HttpStatus.BAD_REQUEST)
        } 
    }

    deleteUser(id: string): IMessage {
        try {
            this.logger.log("Deleting user...");

            this.usersRepository.delete(id)

            return { message: 'User deleted succesfully.' }
        } catch(error) {
            new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Something went wrong"
            }, HttpStatus.BAD_REQUEST)
        }
    }
}