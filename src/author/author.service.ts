import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schema/author.schema';
import { Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author.name) private authorModel: Model<Author>) { }

    async createAuthor(author: Author) {
        author['id'] = uuidv4();
        await this.authorModel.create(author)
    }
}
