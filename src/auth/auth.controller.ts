import { Body, ClassSerializerInterceptor, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { CreateAuthorDto } from '../../src/author/dto/create-author.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBadRequestResponse, ApiResponse, ApiTags, ApiTooManyRequestsResponse } from '@nestjs/swagger';
import { AuthorResponseDto } from '../../src/author/dto/author-response.dto';


@ApiTags('Auth')
@Controller('')
export class AuthController {

    constructor(private authService : AuthService){}
 
    @ApiResponse({
        status : 201,
        description : "returns a success response"
    })
    @ApiBadRequestResponse({
        status : 400,
        description : "User already exists, invalid datas"
    })
    @Post('signup')
    async signup(@Body() authData : CreateAuthorDto){  
        return await this.authService.signup(authData)
    }

    
    
    @ApiResponse({
        status : 200,
        description : "logged in successfully and returns user data with auth token",
        type : AuthorResponseDto
    })
    @ApiBadRequestResponse({
        status : 400,
        description : "Incorrect user id or password"
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(@Body() authData : LoginDto){  
        return await this.authService.login(authData)

    }

}
