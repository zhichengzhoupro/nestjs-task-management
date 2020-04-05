import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {NotificationRepository} from "./notification.repository";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {Notification} from "./notification.entity";
import {NotificationsDto} from "./dto/notifications.dto";
import {UpdateNotificationDto} from "./dto/update-notification.dto";
import {UpdateResult} from "typeorm";
import {NotificationsItemDto} from "./dto/notifications-item.dto";

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(NotificationRepository)
        private notificationRepository : NotificationRepository

    ) {}

    async getArticleById(id: number): Promise<Notification> {
       const found =  await this.notificationRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return found;
    }

    async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return this.notificationRepository.createTodo(createNotificationDto);
    }

    async createNotifications(createNotificationDtos: CreateNotificationDto[]): Promise<void> {
        createNotificationDtos.forEach(cadto =>  this.notificationRepository.createTodo(cadto))

    }

    async deleteTodoById(id: number): Promise<void> {
        const result = await this.notificationRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`todo with ID ${id} not found`);
        }
    }

    async updateArticleById(updateNotificationDto: UpdateNotificationDto): Promise<UpdateResult> {
       return  this.notificationRepository.updateArticle(updateNotificationDto);

    }

    async getNotifications(): Promise<NotificationsDto> {
        const list  = await this.notificationRepository.getArticles();

        const notificationsItemDtos: NotificationsItemDto[]= list.map(notification =>  new NotificationsItemDto({
            id: notification.id,
            title: notification.title,
            createAt: notification.createAt,
            body: notification.body,
            isRed: notification.isRed
        }));

        return {
            list: notificationsItemDtos,
            total: list.length
        }
    }


}
