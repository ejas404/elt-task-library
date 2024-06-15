import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { MongoExceptionFilter } from './filters/mongoose-exception.filter';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath : '.env',isGlobal : true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    AuthModule,
    AuthorModule,
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
