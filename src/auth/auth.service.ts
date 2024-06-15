import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorService } from 'src/author/author.service';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { LoginDto } from './dto/login.dto';
import { checkPasswordMatch } from './utils/bcrypt-hash';

type SignUpResponse = { success: boolean, msg: string }

// generate dto for author login response
const genAuthorResponse = (data: CreateAuthorDto) => {
    const { fullName, biography, userId, birthdate } = data;
    const authorDto = new CreateAuthorDto()

    authorDto.fullName = fullName
    authorDto.biography = biography
    authorDto.userId = userId
    authorDto.birthdate = birthdate;
    return authorDto;
}

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

    
    async login(data: LoginDto): Promise<{ authorDto: CreateAuthorDto, access_token: string }> {

        const { userId } = data

        const user = await this.authorService.findByUserId(userId);
        if (!user) throw new BadRequestException("No user existing");
        if (!checkPasswordMatch(data.password, user.password)) throw new UnauthorizedException("Invalid user id or password");

        const authorDto = genAuthorResponse(user)
        const payload = { sub: authorDto.userId, username: authorDto.fullName };
        const access_token = await this.jwtService.signAsync(payload)

        return { authorDto, access_token }
    }
}
