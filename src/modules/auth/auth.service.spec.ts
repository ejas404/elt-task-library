import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthorService } from 'src/modules/author/author.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthorDto } from 'src/modules/author/dto/create-author.dto';
import { LoginDto } from './dto/login.dto';
import { AuthorResponseDto } from 'src/modules/author/dto/author-response.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SignUpResponse } from './auth.service';
import { checkPasswordMatch } from './utils/bcrypt-hash';

jest.mock('./utils/bcrypt-hash');

describe('AuthService', () => {
  let authService: AuthService;
  let authorService: AuthorService;
  let jwtService: JwtService;

  const mockAuthorService = {
    createAuthor: jest.fn(),
    findByUserId: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthorService,
          useValue: mockAuthorService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authorService = module.get<AuthorService>(AuthorService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should sign up a new user', async () => {
      const createAuthorDto: CreateAuthorDto = {
        userId: 'testuser',
        password: 'testpass',
        fullName: 'Test User',
        birthdate: new Date('2000-01-01').toISOString(),
        biography : ""
      };

      const response: SignUpResponse = { success: true, msg: "Sign up successfully" };

      mockAuthorService.createAuthor.mockResolvedValue(createAuthorDto);

      const result = await authService.signup(createAuthorDto);

      expect(result).toEqual(response);
      expect(mockAuthorService.createAuthor).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('login', () => {
    it('should log in an existing user and return author response with token', async () => {
      const loginDto: LoginDto = {
        userId: 'testuser',
        password: 'testpass',
      };

      const user = {
        userId: 'testuser',
        fullName: 'Test User',
        password: 'hashedpass',
      };

      const token = 'some-jwt-token';
      const authorResponse = plainToInstance(AuthorResponseDto, user, { excludeExtraneousValues: true });
      authorResponse.token = token;

      mockAuthorService.findByUserId.mockResolvedValue(user);
      (checkPasswordMatch as jest.Mock).mockReturnValue(true);
      mockJwtService.signAsync.mockResolvedValue(token);

      const result = await authService.login(loginDto);

      expect(result).toEqual(authorResponse);
      expect(mockAuthorService.findByUserId).toHaveBeenCalledWith(loginDto.userId);
      expect(checkPasswordMatch).toHaveBeenCalledWith(loginDto.password, user.password);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({ sub: user.userId, user: { fullName: user.fullName, userId: user.userId, role: "User" } });
    });

    it('should throw BadRequestException if user does not exist', async () => {
      const loginDto: LoginDto = {
        userId: 'nonexistent',
        password: 'testpass',
      };

      mockAuthorService.findByUserId.mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(BadRequestException);
      expect(mockAuthorService.findByUserId).toHaveBeenCalledWith(loginDto.userId);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const loginDto: LoginDto = {
        userId: 'testuser',
        password: 'wrongpass',
      };

      const user = {
        userId: 'testuser',
        fullName: 'Test User',
        password: 'hashedpass',
      };

      mockAuthorService.findByUserId.mockResolvedValue(user);
      (checkPasswordMatch as jest.Mock).mockReturnValue(false);

      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(mockAuthorService.findByUserId).toHaveBeenCalledWith(loginDto.userId);
      expect(checkPasswordMatch).toHaveBeenCalledWith(loginDto.password, user.password);
    });
  });
});
