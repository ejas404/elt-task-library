import { IsString, IsOptional, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBookDto {

    id: string;

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsNotEmpty()
    readonly authorId: string;

    @IsDateString()
    @IsNotEmpty()
    readonly publishedDate: string;
}