import { Body, ClassSerializerInterceptor, Controller, Delete, Param, Post, UseInterceptors } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('book')
export class BookController {

    constructor(private bookService: BookService) { }

    @Post('create')
    async create(@Body() book: CreateBookDto) {
        return await this.bookService.createBook(book)
    }

    @Delete(':id')
    async delete(@Param() params : {id : string}) {
        const {id} = params;
        return await this.bookService.deleteBook(id)
    }
}
