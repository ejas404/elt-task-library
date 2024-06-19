import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, ModelDefinition } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from "mongoose";
import { CreateBookDto } from './dto/create-book.dto';
import { v4 as uuidv4 } from 'uuid';
import { BookResponseDto } from './dto/book-response.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
   
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }
    async createBook(book: CreateBookDto) {
        const { title } = book
        const isExist = await this.bookModel.findOne({ title : new RegExp(title,'i') });
        if (isExist) throw new BadRequestException('book with same title already exists');

        book['id'] = uuidv4();
        const newBook = await this.bookModel.create(book);
        const bookResponse = plainToInstance(BookResponseDto, newBook, { excludeExtraneousValues: true })
        return bookResponse;
    }

    async updateBook(book : UpdateBookDto){
        const {id,title} = book

        const isTitleExist = await this.bookModel.findOne({ $or :[{title : new RegExp(title,'i')},{id}]});
        // we can check if the updated title name exists in other books.
        // if there is one we can throw the exception
        if(isTitleExist.id !== id) throw new BadRequestException('book with same title already exists');

        const isExist = await this.bookModel.findOne({id});
        if(!isExist) throw new BadRequestException('invalid id or no book with provided id');

        isExist.title = book.title;
        isExist.description = book.description;
        isExist.publishedDate = book.publishedDate;

        await isExist.save()
        const bookResponse = plainToInstance(BookResponseDto, isExist, { excludeExtraneousValues: true })
        return bookResponse;
    }

    async deleteBook(id : string){
        const book = await this.bookModel.findOne({id})
        if(!book) throw new BadRequestException('invalid id or no book with provided id');
        book.isDeleted = true;
        await book.save()
        return {success : true , msg : 'book deleted successfully'};
    }

    async getAuthorBooks(authorId : string){
        const books = await this.bookModel.find({authorId , isDeleted : false }).lean()
        const bookResponse = plainToInstance(BookResponseDto, books, { excludeExtraneousValues: true })
        return bookResponse;
    }

    async getAllBooks(){
        const books = await this.bookModel.find({isDeleted : false }).lean()
        const bookResponse = plainToInstance(BookResponseDto, books, { excludeExtraneousValues: true })
        return bookResponse;
    }

    async findBooksByDateRange(startDate: Date, endDate: Date): Promise<BookResponseDto[]> {
        const books = await this.bookModel.find({publishedDate: {$gte: startDate,$lte: endDate}, isDeleted : false}).lean()
        const bookResponse = plainToInstance(BookResponseDto, books, { excludeExtraneousValues: true })
        return bookResponse;
    }

}
