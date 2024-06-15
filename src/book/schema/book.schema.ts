import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Book {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true })
    authorId: string
    
    @Prop({ required: true })
    publishedDate: Date

    @Prop({default : false})
    isDeleted : boolean
    
    description: string;
}

export const BookSchema = SchemaFactory.createForClass(Book)