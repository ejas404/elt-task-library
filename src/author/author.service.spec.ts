import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthorService } from './author.service';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { Author } from './schema/author.schema';
import { hashPassword } from '../../src/auth/utils/bcrypt-hash';


jest.mock('../../src/auth/utils/bcrypt-hash');

describe('AuthorService', () => {
  let service: AuthorService;
  let model: Model<Author>;

  const mockAuthorModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getModelToken(Author.name),
          useValue: mockAuthorModel,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    model = module.get<Model<Author>>(getModelToken(Author.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const author = {
    userId: 'test@123',
    fullName: "Test User",
    password: 'password123',
    birthdate: "2000-10-31T01:30:00.000-05:00",
    biography: ""
  };

  describe('createAuthor', () => {
    it('should create a new author', async () => {
      const hashedPassword = 'password123';
      (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
      mockAuthorModel.findOne.mockResolvedValue(null);
      mockAuthorModel.create.mockResolvedValue({ ...author, password: hashedPassword });

      await service.createAuthor(author);

      expect(mockAuthorModel.findOne).toHaveBeenCalledWith({ userId: author.userId });
      expect(hashPassword).toHaveBeenCalledWith(hashedPassword);
      expect(mockAuthorModel.create).toHaveBeenCalledWith({ ...author, password: hashedPassword });
    });

    it('should throw an error if userId already exists', async () => {
      mockAuthorModel.findOne.mockResolvedValue(author);

      await expect(service.createAuthor(author)).rejects.toThrow(BadRequestException);
      expect(mockAuthorModel.findOne).toHaveBeenCalledWith({ userId: author.userId });
    });
  });

  describe('findByUserId', () => {
    it('should return an author by userId', async () => {
      const author = { userId: 'testuser', password: 'password123' };
      mockAuthorModel.findOne.mockResolvedValue(author);

      const result = await service.findByUserId('testuser');

      expect(mockAuthorModel.findOne).toHaveBeenCalledWith({ userId: 'testuser' });
      expect(result).toEqual(author);
    });

    it('should return null if no author found', async () => {
      mockAuthorModel.findOne.mockResolvedValue(null);

      const result = await service.findByUserId('unknownuser');

      expect(mockAuthorModel.findOne).toHaveBeenCalledWith({ userId: 'unknownuser' });
      expect(result).toBeNull();
    });
  });
});
