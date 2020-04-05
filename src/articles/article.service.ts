import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ArticleRepository} from "./article.repository";
import {CreateArticleDto} from "./dto/create-article.dto";
import {Article} from "./article.entity";
import {ArticlesDto} from "./dto/articles.dto";
import {UpdateArticleDto} from "./dto/update-article.dto";
import {UpdateResult} from "typeorm";
import {ArticlesItemDto} from "./dto/articles-item.dto";
import {KpiArticleAmountDto} from "./dto/kpi.article.amount.dto";

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(ArticleRepository)
        private articleRepository : ArticleRepository

    ) {}

    async getArticleById(id: number): Promise<Article> {
       const found =  await this.articleRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return found;
    }

    async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articleRepository.createTodo(createArticleDto);
    }

    async createArticles(createArticleDtos: CreateArticleDto[]): Promise<void> {
        createArticleDtos.forEach(cadto =>  this.articleRepository.createTodo(cadto))

    }

    async deleteTodoById(id: number): Promise<void> {
        const result = await this.articleRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`todo with ID ${id} not found`);
        }
    }

    async updateArticleById(updateArticleDto: UpdateArticleDto): Promise<UpdateResult> {
       return  this.articleRepository.updateArticle(updateArticleDto);

    }

    async getArticles(): Promise<ArticlesDto> {
        const list  = await this.articleRepository.getArticles();

        const articles: ArticlesItemDto[]= list.map( article =>  new ArticlesItemDto({
            id: article.id,
            title: article.title,
            author: article.author,
            amount: article.amount,
            createAt: article.createAt
        }));

        return {
            list: articles,
            total: list.length
        }
    }

    async countArticlesAmountByMonth(): Promise<KpiArticleAmountDto[]> {
        const results: any[] = await this.articleRepository.countArticlesAmountByMonth();
        return   results.map(r => new KpiArticleAmountDto({month: r.month, year: r.year, amount: r.amount}));
    }


}
