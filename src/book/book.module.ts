import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';

@Module({
  providers: [BookService],
  controllers: [BookController],
  imports : [MongooseModule.forFeature([{name : Book.name , schema : BookSchema}])]
})
export class BookModule {}
