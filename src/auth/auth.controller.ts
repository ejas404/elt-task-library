import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('signup')
    async signup(@Body() authData : CreateAuthorDto){  
        return await this.authService.signup(authData)
    }

}
