import {
    Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {NotificationService} from "./notification.service";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {Notification} from "./notification.entity";
import {NotificationsDto} from "./dto/notifications.dto";
import {UpdateNotificationDto} from "./dto/update-notification.dto";
import {UpdateResult} from "typeorm";
import {AuthGuard} from "@nestjs/passport";

@Controller('notification')
@UseGuards(AuthGuard())
export class NotificationController {

    constructor(private notificationService: NotificationService) {

    }

    @Get('/:id')
    getNotificationById(@Param('id', ParseIntPipe)id: number): Promise<Notification> {
        const found = this.notificationService.getArticleById(id);
        found.then((data) => {
            console.log(data);
        });
        return found;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createNotification(@Body() createArticleDto: CreateNotificationDto): Promise<Notification> {
        return this.notificationService.createNotification(createArticleDto);
    }

    @Post('/mass')
    @UsePipes(ValidationPipe)
    createNotifications(@Body() createArticleDto: CreateNotificationDto[]) {
         this.notificationService.createNotifications(createArticleDto);
    }

    @Delete('/:id')
    deleteNotificationByid(@Param('id', ParseIntPipe) id:number) {
        return this.notificationService.deleteTodoById(id);
    }

    @Get()
    getAllNotifications(@Param('offset') offset:number, @Param('limited') limited:number): Promise<NotificationsDto> {
        return this.notificationService.getNotifications();
    }

    @Put()
    @UsePipes(ValidationPipe)
    updateNotification(@Body() updateArticleDto: UpdateNotificationDto): Promise<UpdateResult> {
        return this.notificationService.updateArticleById(updateArticleDto);
    }

}