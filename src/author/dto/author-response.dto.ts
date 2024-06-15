import { Exclude, Expose } from "class-transformer";


export class AuthorResponseDto {
    @Expose()
    userId: string;
    @Expose()
    fullName: string;
    
    @Expose()
    birthdate: Date;
    
    @Expose()
    biography: string;
    
    @Expose()
    token: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<AuthorResponseDto>) {
        Object.assign(this, partial);
    }
}