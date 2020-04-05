import {IsEmail, IsString, Matches, MinLength} from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(5)
    @IsEmail()
    username: string;

    @IsString()
    @MinLength(5)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too week'})
    password: string;
}