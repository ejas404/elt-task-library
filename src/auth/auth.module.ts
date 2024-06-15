import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthorModule } from 'src/author/author.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports : [AuthorModule]
})
export class AuthModule {}
