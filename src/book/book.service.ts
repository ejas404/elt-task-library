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
        const isExist = await this.bookModel.findOne({ title })
        if (isExist) throw new BadRequestException('book with same title already exists');

        book['id'] = uuidv4();
        const newBook = await this.bookModel.create(book);
        const bookResponse = plainToInstance(BookResponseDto, newBook, { excludeExtraneousValues: true })
        return bookResponse;
    }

    async deleteBook(id : string){
        const deletedBoook = await this.bookModel.findOneAndDelete({id})
        if(!deletedBoook) throw new BadRequestException('ivalid id or no book with provided id');
        const bookResponse = plainToInstance(BookResponseDto, deletedBoook, { excludeExtraneousValues: true });
        return bookResponse;
    }
}
