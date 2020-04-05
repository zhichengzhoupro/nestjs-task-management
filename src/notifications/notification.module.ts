import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NotificationController} from "./notification.controller";
import {NotificationRepository} from "./notification.repository";
import {NotificationService, } from "./notification.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([NotificationRepository])
    ],
    controllers: [NotificationController],
    providers: [NotificationService]
})
export class NotificationModule {
}
