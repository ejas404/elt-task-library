import { IsDate, IsNotEmpty, IsString } from 'class-validator';



export class CreateAuthorDto{
    
    id : string;

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsString()
    password : string;

    @IsNotEmpty()
    @IsDate()
    birthdate : Date
    
    biography : string;
}
