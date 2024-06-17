import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookResponseDto } from './dto/book-response.dto';
import { BadRequestException } from '@nestjs/common';
import { AuthGuard } from '../../src/auth/guard/auth.guard';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookService = {
    createBook: jest.fn(),
    deleteBook: jest.fn(),
    getAuthorBooks: jest.fn(),
    getAllBooks: jest.fn(),
    findBooksByDateRange: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book and return it', async () => {
      const bookDto: CreateBookDto = {
        title: 'Test Book', description: 'Test Description', authorId: 'author123', publishedDate: '2024-06-15',
        id: '1'
      };
      const bookResponse: BookResponseDto = { ...bookDto, id: '1' };
      mockBookService.createBook.mockResolvedValue(bookResponse);

      expect(await controller.create(bookDto)).toEqual(bookResponse);
      expect(mockBookService.createBook).toHaveBeenCalledWith(bookDto);
    });
  });

  describe('delete', () => {
    it('should delete a book and return success response', async () => {
      const bookId = 'f2794819-04f3-4c8c-a543-b728df623104';
      mockBookService.deleteBook.mockResolvedValue(undefined);

      expect(await controller.delete({ id: bookId })).toBeUndefined();
      expect(mockBookService.deleteBook).toHaveBeenCalledWith(bookId);
    });
  });

  describe('getAuthorBooks', () => {
    it('should return a list of books by author', async () => {
      const authorId = 'max@123';
      const books: BookResponseDto[] = [
        { id: '1', title: 'Book 1', description: 'Description 1', authorId, publishedDate: '2024-06-15' },
        { id: '2', title: 'Book 2', description: 'Description 2', authorId, publishedDate: '2024-06-16' },
      ];
      mockBookService.getAuthorBooks.mockResolvedValue(books);

      expect(await controller.getAuthorBooks({ id: authorId })).toEqual(books);
      expect(mockBookService.getAuthorBooks).toHaveBeenCalledWith(authorId);
    });
  });

  describe('getAllBooks', () => {
    it('should return a list of all books', async () => {
      const books: BookResponseDto[] = [
        { id: '1', title: 'Book 1', description: 'Description 1', authorId: 'author1', publishedDate: '2024-06-15' },
        { id: '2', title: 'Book 2', description: 'Description 2', authorId: 'author2', publishedDate: '2024-06-16' },
      ];
      mockBookService.getAllBooks.mockResolvedValue(books);

      expect(await controller.getAllBooks()).toEqual(books);
      expect(mockBookService.getAllBooks).toHaveBeenCalled();
    });
  });

  describe('findBooksByDateRange', () => {
    it('should return a list of books within the given date range', async () => {
      const start = '2024-06-01';
      const end = '2024-06-30';
      const startDate = new Date(start);
      const endDate = new Date(end);
      const books: BookResponseDto[] = [
        { id: '1', title: 'Book 1', description: 'Description 1', authorId: 'author1', publishedDate: '2024-06-15' },
        { id: '2', title: 'Book 2', description: 'Description 2', authorId: 'author2', publishedDate: '2024-06-16' },
      ];
      mockBookService.findBooksByDateRange.mockResolvedValue(books);

      expect(await controller.findBooksByDateRange(start, end)).toEqual(books);
      expect(mockBookService.findBooksByDateRange).toHaveBeenCalledWith(startDate, endDate);
    });

    it('should throw a BadRequestException for invalid date format', async () => {
      const start = 'invalid-date';
      const end = '2024-06-30';

      await expect(controller.findBooksByDateRange(start, end)).rejects.toThrow(BadRequestException);
      expect(mockBookService.findBooksByDateRange).toHaveBeenCalled();
    });
  });
});

