import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorService } from 'src/modules/author/author.service';
import { CreateAuthorDto } from 'src/modules/author/dto/create-author.dto';
import { LoginDto } from './dto/login.dto';
import { checkPasswordMatch } from './utils/bcrypt-hash';
import { AuthorResponseDto } from 'src/modules/author/dto/author-response.dto';
import { plainToInstance } from 'class-transformer';

export type SignUpResponse = { success: boolean, msg: string }

@Injectable()
export class AuthService {

    constructor(
        private authorService: AuthorService,
        private jwtService: JwtService
    ) { }

    async signup(data: CreateAuthorDto): Promise<SignUpResponse> {
        const user = await this.authorService.createAuthor(data)
        return { success: true, msg: "Sign up successfully" }
    }


    async login(data: LoginDto): Promise<AuthorResponseDto> {

        const { userId } = data

        const user = await this.authorService.findByUserId(userId);
        if (!user) throw new BadRequestException("No user existing");
        if (!checkPasswordMatch(data.password, user.password)) throw new UnauthorizedException("Invalid user id or password");

        const{fullName} = user
        const payload = { sub: user.userId, user: {fullName , userId , role : "User"} };
        const access_token = await this.jwtService.signAsync(payload)
        const authorResponse = plainToInstance(AuthorResponseDto, user, { excludeExtraneousValues: true })
        authorResponse.token = access_token;

        return authorResponse
    }
}
