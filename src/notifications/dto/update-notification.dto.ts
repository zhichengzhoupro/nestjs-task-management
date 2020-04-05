import {IsNotEmpty} from 'class-validator'


export class UpdateNotificationDto {

    id: string;

    title: string;

    body: string;

    author: string;

    amount: number;

    createAt: string;

}