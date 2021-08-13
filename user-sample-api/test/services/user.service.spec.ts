import * as dotenv from 'dotenv';
import { TestingModule, Test } from '@nestjs/testing';
import { Repository, getConnection } from 'typeorm';
import { User } from '../../src/user/entity/user.entity';
import { DatabaseModule } from '../../src/database/database.module';
import { userProvider } from '../../src/user/providers/user-provider';
import { UserService } from '../../src/user/user.service';
import { 
    MOCK_USER_CREATION_RETURN, 
    MOCK_USER_CREATION,
    MOCK_GET_ALL_USERS,
    MOCK_USER,
    MOCK_EDITED_USER,
    NOT_EXISTING_USER,
    USER_DELETED
} from '../mock/services/user-mock';
import { BadRequestException, HttpException } from '@nestjs/common';

dotenv.config();

describe('User Service Tests', () => {  
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule],
            providers: [
                ...userProvider,
                UserService
            ]
        }).compile();

        userService = module.get(UserService);
        userRepository = module.get('USER_REPOSITORY');
    });
 
    afterEach(async () => {
        await getConnection().close();
    })

    it('Should create a user succesfully', async () => {
        const mockRepository = jest.spyOn(userRepository, 'save');
        mockRepository.mockImplementation();

        const response = await userService.createUser(MOCK_USER_CREATION);
        expect(response).toEqual(MOCK_USER_CREATION_RETURN);
    });

    it('Should return an error for user creation', async () => {
        const mockRepository = jest.spyOn(userRepository, 'save');
        mockRepository.mockImplementation(() => Promise.reject());

        try {
            await userService.createUser(MOCK_USER_CREATION);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
        }
    })

    it('Should retrieve all users succesfully', async () => {
        const mockRepository = jest.spyOn(userRepository, 'find');
        mockRepository.mockImplementation(() => Promise.resolve(MOCK_GET_ALL_USERS));
        
        const response = await userService.getAllUsers()
        expect(response).toEqual(MOCK_GET_ALL_USERS);
    });

    it('Should return an error for all users retrieval', async() => {
        const mockRepository = jest.spyOn(userRepository, 'find');
        mockRepository.mockImplementation(() => {
            throw new HttpException('', 400)
        });

        try {
            await userService.getAllUsers();
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
        }
    })

    it('Should retrieve user by id succesfully', async () => {
            const mockRepository = jest.spyOn(userRepository, 'findOne');
            mockRepository.mockImplementation(() => Promise.resolve(MOCK_USER));

            const mockUUID = '8a072a35-4d9a-49ec-ab6f-0517e2791b13';
            
            const response = await userService.getUserById(mockUUID);
            expect(response).toEqual(MOCK_USER);
    });

    it('Should return an error for user retrieval', async () => {
        const mockRepository = jest.spyOn(userRepository, 'findOne');
        mockRepository.mockImplementation(() => {
            throw new HttpException('', 400)
        });

        const mockUUID = "8a072a35-4d9a-49ec-ab6f-0517e2791b25";

        try {
            await userService.getUserById(mockUUID);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
        }
    })

    it('Should retrieve user by email succesfully', async () => {
        const mockRepository = jest.spyOn(userRepository, 'findOne');
        mockRepository.mockImplementation(() => Promise.resolve(MOCK_USER));

        const mockEmail = 'blabla@a.com';

        const response = await userService.getUserByEmail(mockEmail);
        expect(response).toEqual(MOCK_USER);
    });

    it('Should update user succesfully', async () => {
        const mockRepository = jest.spyOn(userRepository, 'save');
        mockRepository.mockImplementation(() => Promise.resolve(MOCK_EDITED_USER));

        const mockUUID = '8a072a35-4d9a-49ec-ab6f-0517e2791b13';

        const response = await userService.updateUser(mockUUID, MOCK_EDITED_USER);
        expect(response).toEqual(MOCK_EDITED_USER);
    });

    it('Should return an error for user update', async () => {
        const mockRepository = jest.spyOn(userRepository, 'findOne');
        mockRepository.mockImplementation();

        const mockUUID = "8a072a35-4d9a-49ec-ab6f-0517e2791b18";
        
        try {
            await userService.updateUser(mockUUID, NOT_EXISTING_USER)
        } catch(error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })

    it('Should delete user succesfully', async () => {
       const mockRepository = jest.spyOn(userRepository, 'delete');
       mockRepository.mockImplementation();

       const mockUUID = '8a072a35-4d9a-49ec-ab6f-0517e2791b13';

       const response = await userService.deleteUser(mockUUID);
       expect(response).toEqual(USER_DELETED)
    });

    it('Should return an error for user deletion', async () => {
        const mockRepository = jest.spyOn(userRepository, 'delete');
        mockRepository.mockImplementation(() => {
            throw new HttpException('', 400)
        })

        const mockUUID = '8a072a35-4d9a-49ec-ab6f-0517e2791b13';

        try {
            await userService.deleteUser(mockUUID)
        } catch(error) {
            expect(error).toBeInstanceOf(HttpException);
        }
    })

    it('Should return an error for user retrieval by email', async () => {
        const mockRepository = jest.spyOn(userRepository, 'findOne');
        mockRepository.mockImplementation(() => {
            throw new HttpException('', 400);
        })

        const mockUserEmail = "mock@email.com";

        try {
            await userService.getUserByEmail(mockUserEmail)
        } catch(error) {
            expect(error).toBeInstanceOf(HttpException)
        };
    })
})