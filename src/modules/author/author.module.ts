import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { Author, AuthorSchema } from './schema/author.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  imports : [MongooseModule.forFeature([{name : Author.name, schema : AuthorSchema}])],
  exports : [AuthorService]
})
export class AuthorModule {}
