import {IsNotEmpty} from "class-validator";

export class NotificationsItemDto {

    id: number;

    title: string;

    body: string;

    createAt: Date;

    isRed: boolean;

    public constructor(
        fields?: {
            id?: number,
            createAt: Date,
            title?: string,
            body?: string,
            isRed?:boolean
        }) {
        if (fields) Object.assign(this, fields);
    }
}