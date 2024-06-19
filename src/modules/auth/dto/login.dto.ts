import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto{
    
    @ApiProperty({
        description: 'The unique identifier for the Author',
        example: 'max@123',
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    userId : string
    

    @ApiProperty({
        description: 'The password for the Author account',
        example: 'keepitsecret',
        type: String,
        required: true,
        format: 'password'
      })
    @IsNotEmpty()
    @IsString()
    password : string
}



