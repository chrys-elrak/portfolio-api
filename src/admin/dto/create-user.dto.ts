import { IsAlphanumeric, isEnum, IsLowercase, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class createUserDto {
    @MaxLength(20)
    @MinLength(5)
    @IsLowercase()
    @IsAlphanumeric()
    @IsString()
    @IsNotEmpty()
    username: string;

    @MaxLength(50)
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password: string;
}