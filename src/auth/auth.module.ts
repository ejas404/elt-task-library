import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthorModule } from 'src/author/author.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/jwt.constant';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports : [
    AuthorModule,
    JwtModule.register({
      global: true,
      secret:jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ]
})
export class AuthModule {}
