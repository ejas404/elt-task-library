import { IsDateString, IsNotEmpty, IsString } from 'class-validator';



export class CreateAuthorDto{
   
    @IsNotEmpty()
    @IsString()
    readonly userId : string;

    @IsNotEmpty()
    @IsString()
    readonly fullName : string;

    @IsNotEmpty()
    @IsString()
    readonly password : string;

    @IsNotEmpty()
    @IsDateString()
    readonly birthdate : Date;
    
    readonly biography : string;
}
