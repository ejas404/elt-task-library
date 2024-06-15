import { Injectable } from '@nestjs/common';
import { AuthorService } from 'src/author/author.service';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';

type SignUpResponse = {success : boolean, msg : string}

@Injectable()
export class AuthService {

    constructor(private authorService : AuthorService){}

    async signup(data: CreateAuthorDto): Promise<SignUpResponse> {
       const user = await this.authorService.createAuthor(data)
       return {success : true, msg : "Sign up successfully"}
    }
}
