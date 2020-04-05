import {IsNotEmpty} from 'class-validator'


export class UpdateArticleDto {

    id: string;

    title: string;

    body: string;

    author: string;

    amount: number;

    createAt: string;

}