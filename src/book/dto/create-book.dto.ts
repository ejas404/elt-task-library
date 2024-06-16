import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBookDto {

    id: string;

    @ApiProperty({
        description: 'Title of the book (should ideally be unique)',
        example: 'Harry Potter',
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    readonly title: string;


    @ApiProperty({
        description: 'Description of the book (optional)',
        example: 'A thrilling fantasy novel about wizards and magical creatures.',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly description?: string;


    @ApiProperty({
        description: 'Unique identifier of the author',
        example: 'max@123',
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly authorId: string;

    
    @ApiProperty({
        description: 'Date when the book was published (in ISO 8601 format)',
        example: '2024-06-15T00:00:00Z',
        type: String,
        required: true,
        format: 'date-time',
    })
    @IsDateString()
    @IsNotEmpty()
    readonly publishedDate: string;
}