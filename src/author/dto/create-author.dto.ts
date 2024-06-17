import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';



export class CreateAuthorDto {

    @ApiProperty({
        description: 'The unique identifier for the Author',
        example: 'max@123',
        type: String,
        required: true
    })
    @IsNotEmpty()
    @IsString()
    readonly userId: string;

    
    @ApiProperty({
        description: 'The full Name of the Author',
        example: 'MAX PAYNE',
        type: String,
        required: true
    })
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;

    
    @ApiProperty({
        description: 'The password for the Author account',
        example: 'keepitsecret',
        type: String,
        required: true,
        format: 'password'
      })
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    
    @ApiProperty({
        description: 'The birthdate of the Author in ISO 8601 format',
        example: '2024-06-15T10:00:00Z',
        type: String,
        format: 'date-time',
        required: true
      })
    @IsNotEmpty()
    @IsDateString()
    readonly birthdate: string;
    
    
    @ApiProperty({
        description: 'A brief biography of the Author',
        example: 'Max Payne is an accomplished novelist and screenwriter based in New York City. Born in 1975',
        type: String,
        required: false
      })
    @IsString()
    readonly biography: string;
}
