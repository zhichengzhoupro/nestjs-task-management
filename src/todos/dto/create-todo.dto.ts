import {IsNotEmpty} from 'class-validator'


export class CreateTodoDto {

    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    userId: string;
}