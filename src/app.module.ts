import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorModule } from './modules/author/author.module';
import { MongoExceptionFilter } from './filters/mongoose-exception.filter';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath : '.env',isGlobal : true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    AuthorModule,
    BookModule
  ]
})
export class AppModule {}
