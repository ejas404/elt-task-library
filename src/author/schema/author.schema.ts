import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';


@Schema()
export class Author {

    @Prop({ required: true, unique: true })
    userId: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    birthdate: Date

    biography: string
}


export type AuthorDocument = HydratedDocument<Author>

export const AuthorSchema = SchemaFactory.createForClass(Author)