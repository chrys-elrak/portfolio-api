import { IsAlphanumeric, IsLowercase, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class loginUserDto {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}