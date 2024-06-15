import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto{
    @IsString()
    userId : string

    @IsNotEmpty()
    password : string
}