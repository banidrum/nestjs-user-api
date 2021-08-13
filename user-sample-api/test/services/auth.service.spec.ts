import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../src/auth/auth.service";
import { UserService } from '../../src/user/user.service';
import { DatabaseModule } from "../../src/database/database.module";
import { User } from "../../src/user/entity/user.entity";
import { userProvider } from "../../src/user/providers/user-provider";
import { getConnection, Repository } from "typeorm";
import {
    MOCK_TOKEN,
    RETRIEVED_USER,
    USER_LOGIN_DATA,
    VALIDATED_USER,
} from '../mock/services/auth-mock';
import * as dotenv from 'dotenv';
import { JwtModule, JwtService } from "@nestjs/jwt";
import mockedJwtService from "../mock/services/mockedJwtService";

dotenv.config();

describe('Auth Service Tests', () => {
    let userService: UserService;
    let authService: AuthService;
    let jwtService: JwtService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, 
                JwtModule.register({
                    secret: `${process.env.JWT_SECRET}`,
                    signOptions: { expiresIn: '120s' },
                })
            ],
            providers: [
                ...userProvider,
                AuthService,
                UserService,
                // JwtService,
                {
                    provide: JwtService,
                    useValue: mockedJwtService
                }
            ]
        }).compile()

        authService = module.get(AuthService);
        userService = module.get(UserService);
        jwtService = module.get(JwtService);
        userRepository = module.get('USER_REPOSITORY');
    })

    afterEach(async () => {
        await getConnection().close();
    })

    it('Should validate the user', async () =>  {
        const mockRepository = jest.spyOn(userRepository, 'findOne');
        
        mockRepository.mockImplementation(() => Promise.resolve(RETRIEVED_USER));

        userService.getUserByEmail(USER_LOGIN_DATA.username);
            
        const response = await authService.validateUser(USER_LOGIN_DATA.username, USER_LOGIN_DATA.password);

        expect(response).toEqual(VALIDATED_USER);
    });

    it("Should return null if the user can't be validated", async () => {
        const mockRepository = jest.spyOn(userRepository, 'findOne');
        
        mockRepository.mockImplementation(() => Promise.resolve(null));

        userService.getUserByEmail(USER_LOGIN_DATA.username);
            
        const response = await authService.validateUser(USER_LOGIN_DATA.username, USER_LOGIN_DATA.password);
        expect(response).toEqual(null);
    })

    it('Should login succesfully', async () => {
        const mockService = jest.spyOn(jwtService, 'sign');

        mockService.mockImplementation(() => { return MOCK_TOKEN })

        authService.login(USER_LOGIN_DATA);

        const response = await jwtService.sign(USER_LOGIN_DATA);
        expect(response).toEqual(MOCK_TOKEN)
    });
})