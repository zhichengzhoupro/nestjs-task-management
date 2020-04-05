import {IsOptional, Matches} from "class-validator";

export class AuthUpdateDto {

    username: string;

    id: number;

    avatarUrl: string;

    displayName: string;

    role: string;

    @IsOptional()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too week'})
    password: string;

}