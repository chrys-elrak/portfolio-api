import { IsAlphanumeric, IsLowercase, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class createUserDto {
    @MaxLength(20)
    @MinLength(5)
    @IsLowercase()
    @IsAlphanumeric()
    @IsNotEmpty()
    @IsString()
    username: string;

    @MaxLength(50)
    @MinLength(6)
    @IsNotEmpty()
    @IsString()
    password: string;
}