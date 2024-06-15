import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Author {

    @Prop({required : true})
    id : string

    @Prop({required : true})
    name : string;
    
    biography : string;
    
    @Prop({required : true})
    birthdate : Date
}

export const AuthorSchema = SchemaFactory.createForClass(Author)