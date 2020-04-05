import {EntityRepository, Repository, UpdateResult} from "typeorm";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {Notification} from "./notification.entity";
import {UpdateNotificationDto} from "./dto/update-notification.dto";
import * as moment from 'moment';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {

    async createTodo(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const {body, title} = createNotificationDto;

        const notification: Notification =  new Notification();
        notification.body = body;
        notification.title = title;
        notification.createAt = new Date();


        return await this.save(notification);
    }

    async getArticles():  Promise<Notification[]> {

        const queryBuilder = this.createQueryBuilder('notification');

        const notifications = await  queryBuilder.orderBy('notification.id', "ASC").getMany();

        return notifications;
    }

    async  updateArticle(updateArticleDto: UpdateNotificationDto): Promise<UpdateResult> {
        const {body, title, author, amount, id, createAt} = updateArticleDto;

        const notification: Notification =  new Notification();
        notification.body = body;
        notification.title = title;
        notification.createAt = moment(createAt, 'YYYY-MM-DD hh:mm:ss').toDate();

       return  await this.update(id, notification )
    }

}