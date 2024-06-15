import { IsEmail, IsNotEmpty, IsString } from 'class-validator';



export class CreateAuthorDto{
    
    id : string;

    @IsNotEmpty()
    @IsString()
    name : string;

    biography : string;

    @IsNotEmpty()
    birthdate : Date
}
