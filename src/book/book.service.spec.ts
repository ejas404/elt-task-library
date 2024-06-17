import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BookResponseDto } from './dto/book-response.dto';
import { Model } from 'mongoose';
import * as uuid from 'uuid';
import { Book } from './schema/book.schema';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('BookService', () => {
  let service: BookService;
  let model: Model<Book>;

  const mockBookModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    lean: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    model = module.get<Model<Book>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a book and return it', async () => {
      const bookDto: CreateBookDto = {
        title: 'Test Book', description: 'Test Description', authorId: 'author123', publishedDate: '2024-06-15',
        id: '1'
      };
      const newBook = { ...bookDto, id: 'mock-uuid' };
      mockBookModel.findOne.mockResolvedValue(null);
      mockBookModel.create.mockResolvedValue(newBook);

      const result = await service.createBook(bookDto);

      expect(mockBookModel.findOne).toHaveBeenCalledWith({ title: new RegExp(bookDto.title, 'i') });
      expect(mockBookModel.create).toHaveBeenCalledWith({ ...bookDto, id: 'mock-uuid' });
      expect(result).toEqual(plainToInstance(BookResponseDto, newBook, { excludeExtraneousValues: true }));
    });

    it('should throw an error if book with same title exists', async () => {
      const bookDto: CreateBookDto = {
        title: 'Test Book', description: 'Test Description', authorId: 'author123', publishedDate: '2024-06-15',
        id: '1'
      };
      mockBookModel.findOne.mockResolvedValue(bookDto);

      await expect(service.createBook(bookDto)).rejects.toThrow(BadRequestException);
      expect(mockBookModel.findOne).toHaveBeenCalledWith({ title: new RegExp(bookDto.title, 'i') });
    });
  });

  describe('deleteBook', () => {
    it('should delete a book and return success response', async () => {
      const book = { id: 'mock-uuid', save: jest.fn() };
      mockBookModel.findOne.mockResolvedValue(book);

      const result = await service.deleteBook('mock-uuid');

      expect(mockBookModel.findOne).toHaveBeenCalledWith({ id: 'mock-uuid' });
      expect(book.save).toHaveBeenCalled();
      expect(result).toEqual({ success: true, msg: 'book deleted successfully' });
    });

    it('should throw an error if book id is invalid', async () => {
      mockBookModel.findOne.mockResolvedValue(null);

      await expect(service.deleteBook('invalid-id')).rejects.toThrow(BadRequestException);
      expect(mockBookModel.findOne).toHaveBeenCalledWith({ id: 'invalid-id' });
    });
  });

  describe('getAuthorBooks', () => {
    it('should return a list of books by author', async () => {
      const books = [{ id: '1', title: 'Book 1', authorId: 'author123' }];
      mockBookModel.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(books)
      });

      const result = await service.getAuthorBooks('author123');

      expect(mockBookModel.find).toHaveBeenCalledWith({ authorId: 'author123', isDeleted: false });
      expect(result).toEqual(books);
    });
  });

  describe('getAllBooks', () => {
    it('should return a list of all books', async () => {
      const books = [{ id: '1', title: 'Book 1', authorId: 'author1' }];
      mockBookModel.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(books)
      });

      const result = await service.getAllBooks();

      expect(mockBookModel.find).toHaveBeenCalledWith({ isDeleted: false });
      expect(result).toEqual(books);
    });
  });

  describe('findBooksByDateRange', () => {
    it('should return a list of books within the given date range', async () => {
      const startDate = new Date('2024-06-01');
      const endDate = new Date('2024-06-30');
      const books = [{ id: '1', title: 'Book 1', publishedDate: '2024-06-15' }];
      mockBookModel.find.mockReturnValue({
        lean: jest.fn().mockResolvedValue(books)
      });

      const result = await service.findBooksByDateRange(startDate, endDate);

      expect(mockBookModel.find).toHaveBeenCalledWith({
        publishedDate: { $gte: startDate, $lte: endDate },
        isDeleted: false,
      });
      expect(result).toEqual(books);
    });
  });
});
