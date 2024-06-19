import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";


export class AuthorResponseDto {
    
    @ApiProperty()
    @Expose()
    userId: string;

    @ApiProperty()
    @Expose()
    fullName: string;
    
    @ApiProperty()
    @Expose()
    birthdate: Date;
    
    @ApiProperty()
    @Expose()
    biography: string;
    
    @ApiProperty({
        description : "generatd auth token"
    })
    @Expose()
    token: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<AuthorResponseDto>) {
        Object.assign(this, partial);
    }
}