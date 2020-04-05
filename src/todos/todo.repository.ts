import {EntityRepository, Repository} from "typeorm";
import {Todo} from "./todo.entity";
import {CreateTodoDto} from "./dto/create-todo.dto";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {

    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const {message, userId, title} = createTodoDto;

        const todo: Todo =  new Todo();
        todo.message = message;
        todo.title = title;
        todo.userId = userId;

        return await this.save(todo);
    }

    async getTasks():  Promise<Todo[]> {

        const queryBuilder = this.createQueryBuilder('todo');


        const todos = await  queryBuilder.getMany();

        return todos;
    }

}