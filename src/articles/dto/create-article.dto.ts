import {IsNotEmpty} from 'class-validator'


export class CreateArticleDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    body: string;

    @IsNotEmpty()
    author: string;

    amount: number

}