import { Expose } from "class-transformer";


export class BookResponseDto {
    @Expose()
    id: string;
    
    @Expose()
    title: string;
    
    @Expose()
    description: Date;
    
    @Expose()
    authorId: string;
    
    @Expose()
    publishedDate: string;

    constructor(response: BookResponseDto) {
        Object.assign(this, response);
    }
}