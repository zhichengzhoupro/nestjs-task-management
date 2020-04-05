import {
    Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {TodoService} from "./todo.service";
import {CreateTodoDto} from "./dto/create-todo.dto";
import {Todo} from "./todo.entity";

@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService) {

    }

    @Get('/:id')
    getTodoById(@Param('id', ParseIntPipe)id: number): Promise<Todo> {
        const found = this.todoService.getTodoById(id);
        found.then((data) => {
            console.log(data);
        });
        return found;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoService.createTodo(createTodoDto);
    }

    @Delete('/:id')
    deleteTodoByid(@Param('id', ParseIntPipe) id:number) {
        return this.todoService.deleteTodoById(id);
    }

    @Get()
    getAllTodo(): Promise<Todo[]> {
        console.log("in");
        return this.todoService.getTodos();
    }
}