import {IsEmail, IsString, Matches, MinLength} from "class-validator";

export class AuthResponseDto {

    username: string;

    id: number;

    avatarUrl: string;

    displayName: string;

    role: string;

}