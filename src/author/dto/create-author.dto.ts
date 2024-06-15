import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';



export class CreateAuthorDto{
    
    id : string;

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsString()
    password : string;

    @IsNotEmpty()
    @IsDateString()
    birthdate : Date;
    
    biography : string;
}
