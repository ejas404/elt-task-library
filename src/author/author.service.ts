import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schema/author.schema';
import { Model } from "mongoose";
import { hashPassword } from '../../src/auth/utils/bcrypt-hash';

@Injectable()
export class AuthorService {
   
    constructor(@InjectModel(Author.name) private authorModel: Model<Author>) { }

    async createAuthor(author: Author) {
        const { userId,password } = author;

        // check if user exits with same userId
        const isExist = await this.authorModel.findOne({userId})
        if(isExist) throw new BadRequestException("cannot use this user id");

        const hash = await hashPassword(password);
        author['password'] = hash;
        await this.authorModel.create(author)
    }

    async  findByUserId(userId: string) {
        return await this.authorModel.findOne({userId})
    }
}
