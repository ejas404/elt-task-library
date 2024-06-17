import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthorDto } from '../../src/author/dto/create-author.dto';
import { LoginDto } from './dto/login.dto';


describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signup: jest.fn((dto) => {
      return Promise.resolve({success : true , msg : "signup success fully"});
    }),
    login: jest.fn((dto) => {
      return Promise.resolve({
        userId: dto.userId,
        fullName: 'John Doe',
        token: 'some-token'
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const createAuthorDto: CreateAuthorDto = {
        userId: 'testuser',
        password: 'testpass',
        fullName: 'Test User',
        birthdate: new Date('2000-01-01').toISOString(),
        biography : ''
      };

      const result = await authController.signup(createAuthorDto);

      expect(result).toEqual({success : true , msg : "signup success fully"});
      expect(authService.signup).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('login', () => {
    it('should log in an existing user', async () => {
      const loginDto: LoginDto = {
        userId: 'testuser',
        password: 'testpass',
      };

      const result = await authController.login(loginDto);

      expect(result).toEqual({
        userId: 'testuser',
        fullName: 'John Doe',
        token: 'some-token'
      });
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
