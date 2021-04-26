import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @MaxLength(50)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    name: string;

}