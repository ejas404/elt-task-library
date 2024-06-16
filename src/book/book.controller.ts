import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('book')
export class BookController {

    constructor(private bookService: BookService) { }

    @UseGuards(AuthGuard)
    @Post('create')
    async create(@Body() book: CreateBookDto) {
        return await this.bookService.createBook(book)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param() params : {id : string}) {
        const {id} = params;
        return await this.bookService.deleteBook(id)
    }

    @UseGuards(AuthGuard)
    @Get('author/:id')
    async getAuthorBooks(@Param() params : {id : string}){
        const {id} = params;
        return await this.bookService.getAuthorBooks(id)
    }

    @Get('')
    async getAllBooks(){
        return await this.bookService.getAllBooks()
    }
}
