import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Author {

    @Prop({ required: true })
    id: string

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    birthdate: Date

    biography: string
}



export const AuthorSchema = SchemaFactory.createForClass(Author)