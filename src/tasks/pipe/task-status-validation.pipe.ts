import {ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform} from "@nestjs/common";
import {TaskStatus} from "../tasks-status.enum";



@Injectable()
export class TaskStatusValidationPipe implements PipeTransform{

    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ]

    transform(value: any) {
        value = value.toUpperCase();
        if(!this.isStatusValide(value)){
            throw new BadRequestException(`${value} is an validated status`);
        }

        return value;
    }

    private isStatusValide(status: any):boolean {
        return this.allowedStatus.indexOf(status) !== -1;
    }

}