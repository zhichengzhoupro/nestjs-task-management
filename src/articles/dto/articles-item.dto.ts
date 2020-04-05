import {IsNotEmpty} from "class-validator";

export class ArticlesItemDto {

    id: number;

    title: string;

    author: string;

    amount: number;

    createAt: Date;

    public constructor(
        fields?: {
            id?: number,
            author?: string,
            amount?: number,
            createAt: Date,
            title?: string,
        }) {
        if (fields) Object.assign(this, fields);
    }
}