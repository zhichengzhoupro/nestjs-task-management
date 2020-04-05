import {
    Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {ArticleService} from "./article.service";
import {CreateArticleDto} from "./dto/create-article.dto";
import {Article} from "./article.entity";
import {ArticlesDto} from "./dto/articles.dto";
import {UpdateArticleDto} from "./dto/update-article.dto";
import {UpdateResult} from "typeorm";
import {KpiArticleAmountDto} from "./dto/kpi.article.amount.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('article')
@UseGuards(AuthGuard())
export class ArticleController {

    constructor(private articleService: ArticleService) {

    }

    @Get('/:id')
    getTodoById(@Param('id', ParseIntPipe)id: number): Promise<Article> {
        const found = this.articleService.getArticleById(id);
        found.then((data) => {
            console.log(data);
        });
        return found;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTodo(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articleService.createArticle(createArticleDto);
    }

    @Post('/mass')
    @UsePipes(ValidationPipe)
    createTodos(@Body() createArticleDto: CreateArticleDto[]) {
         this.articleService.createArticles(createArticleDto);
    }

    @Delete('/:id')
    deleteTodoByid(@Param('id', ParseIntPipe) id:number) {
        return this.articleService.deleteTodoById(id);
    }

    @Get()
    getAllTodo(@Param('offset') offset:number, @Param('limited') limited:number): Promise<ArticlesDto> {
        return this.articleService.getArticles();
    }

    @Put()
    @UsePipes(ValidationPipe)
    updateArticle(@Body() updateArticleDto: UpdateArticleDto): Promise<UpdateResult> {
        return this.articleService.updateArticleById(updateArticleDto);
    }

    @Post('/kpi/amount/month')
    kpiAmountByMonth():Promise<KpiArticleAmountDto[]> {
        return this.articleService.countArticlesAmountByMonth();
    }

}