import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class BookResponseDto {
    
    @ApiProperty()
    @Expose()
    id: string;
    
    @ApiProperty()
    @Expose()
    title: string;
    
    @ApiProperty()
    @Expose()
    description: Date;
    
    @ApiProperty()
    @Expose()
    authorId: string;
    
    @ApiProperty()
    @Expose()
    publishedDate: string;

    constructor(response: BookResponseDto) {
        Object.assign(this, response);
    }
}