import {EntityRepository, Repository, UpdateResult} from "typeorm";
import {CreateArticleDto} from "./dto/create-article.dto";
import {Article} from "./article.entity";
import {UpdateArticleDto} from "./dto/update-article.dto";
import * as moment from 'moment';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    async createTodo(createArticleDto: CreateArticleDto): Promise<Article> {
        const {body, title, author, amount} = createArticleDto;

        const article: Article =  new Article();
        article.body = body;
        article.title = title;
        article.createAt = new Date();
        article.author = author;
        article.amount = amount;

        return await this.save(article);
    }

    async getArticles():  Promise<Article[]> {

        const queryBuilder = this.createQueryBuilder('article');

        const articles = await  queryBuilder.orderBy('article.id', "ASC").getMany();

        return articles;
    }

    async  updateArticle(updateArticleDto: UpdateArticleDto): Promise<UpdateResult> {
        const {body, title, author, amount, id, createAt} = updateArticleDto;

        const article: Article =  new Article();
        article.body = body;
        article.title = title;
        article.createAt = moment(createAt, 'YYYY-MM-DD hh:mm:ss').toDate();
        article.author = author;
        article.amount = amount;

       return  await this.update(id, article )
    }

    async countArticlesAmountByMonth(): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('article')
            .select("SUM(article.amount)", "amount")
            .addSelect("date_part('month', article.createAt)", "month")
            .addSelect("date_part('year', article.createAt)", "year")
            .groupBy("date_part('year', article.createAt), date_part('month', article.createAt)")

        return await queryBuilder.getRawMany();

    }

}