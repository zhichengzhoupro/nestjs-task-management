import {
    Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";
import {TaskStatusValidationPipe} from "./pipe/task-status-validation.pipe";
import {TaskStatus} from "./tasks-status.enum";
import {AuthGuard} from "@nestjs/passport";
import {Task} from "./task.entity";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private taskService: TasksService) {

    }

    // @Get()
    // getAllTasks(@Query()filterDto:  GetTaskFilterDto): Task[] {
    //     if(Object.keys(filterDto).length) {
    //         return this.taskService.getTasksByFilter(filterDto);
    //     }
    //     return this.taskService.getAllTasks();
    // }
    //
    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(
    //     @Body() createTaskDto: CreateTaskDto
    // ): Task {
    //     return this.taskService.createTask(createTaskDto);
    // }
    //
    // @Get('/:id')
    // getTaskById(@Param('id')id:string) {
    //     const found = this.taskService.getTaskById(id);
    //
    //     return found;
    // }
    //

    //
    @Patch('/:id/status')
    updateTaskStatusByid(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.taskService.updateTaskStatusById(id, status);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe)id: number): Promise<Task> {
        const found = this.taskService.getTaskById(id);
        found.then((data) => {
            console.log(data);
        });
        return found;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskByid(@Param('id', ParseIntPipe) id:number) {
        return this.taskService.deleteTaskById(id);
    }

    @Get()
    getAllTasks(@Query()filterDto:  GetTaskFilterDto): Promise<Task[]> {
        return this.taskService.getTasks(filterDto);
    }

}
