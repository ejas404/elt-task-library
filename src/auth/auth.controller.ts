import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('signup')
    async signup(@Body() authData : CreateAuthorDto){  
        return await this.authService.signup(authData)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(@Body() authData : LoginDto){  
        return await this.authService.login(authData)

    }

}
