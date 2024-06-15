import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath : '.env',isGlobal : true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
