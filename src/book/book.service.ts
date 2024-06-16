import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, ModelDefinition } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from "mongoose";
import { CreateBookDto } from './dto/create-book.dto';
import { v4 as uuidv4 } from 'uuid';
import { BookResponseDto } from './dto/book-response.dto';
import { plainToInstance } from 'class-transformer';

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

    async deleteBook(id : string){
        const book = await this.bookModel.findOne({id})
        if(!book) throw new BadRequestException('invalid id or no book with provided id');
        await book.save()
        return {success : true , msg : 'book deleted successfully'};
    }

    async getAuthorBooks(authorId : string){
        return await this.bookModel.find({authorId , isDeleted : false }).lean()
    }

    async getAllBooks(){
        return await this.bookModel.find({isDeleted : false }).lean()
    }
}
