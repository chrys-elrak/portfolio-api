import { IsAlphanumeric, IsLowercase, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class loginUserDto {
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}