import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { AuthService } from './auth.service';
import { Author } from 'src/author/schema/author.schema';
import { LoginDto } from './dto/login.dto';

@Controller('')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('signup')
    async signup(@Body() authData : CreateAuthorDto){  
        return await this.authService.signup(authData)
    }

    @Post('login')
    async login(@Body() authData : LoginDto){  
        return await this.authService.login(authData)

    }

}
