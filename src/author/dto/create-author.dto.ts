import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';



export class CreateAuthorDto{
   
    @IsNotEmpty()
    @IsString()
    userId : string;

    @IsNotEmpty()
    @IsString()
    fullName : string;

    @IsNotEmpty()
    @IsString()
    password : string;

    @IsNotEmpty()
    @IsDateString()
    birthdate : Date;
    
    biography : string;
}
