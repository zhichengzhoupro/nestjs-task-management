import {IsNotEmpty} from 'class-validator'

export class SearchArticleDto {

    @IsNotEmpty()
    offset: number;

    @IsNotEmpty()
    limited: number;
}