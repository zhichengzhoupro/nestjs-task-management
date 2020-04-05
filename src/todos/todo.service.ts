import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Todo} from "./todo.entity";
import {TodoRepository} from "./todo.repository";
import {CreateTodoDto} from "./dto/create-todo.dto";

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(TodoRepository)
        private todoRepository : TodoRepository

    ) {}

    async getTodoById(id: number): Promise<Todo> {
       const found =  await this.todoRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return found;
    }

    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoRepository.createTodo(createTodoDto);
    }

    async deleteTodoById(id: number): Promise<void> {
        const result = await this.todoRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`todo with ID ${id} not found`);
        }
    }

    async getTodos(): Promise<Todo[]> {
        return await this.todoRepository.getTasks();
    }


}
