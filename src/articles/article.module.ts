import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticleController} from "./article.controller";
import {ArticleRepository} from "./article.repository";
import {ArticleService, } from "./article.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([ArticleRepository])
    ],
    controllers: [ArticleController],
    providers: [ArticleService]
})
export class ArticleModule {
}
