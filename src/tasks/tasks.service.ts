import {Injectable, NotFoundException} from '@nestjs/common';
import * as uuid from "uuid/v1";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {TaskRepository} from "./task.repository";
import {Task} from "./task.entity";
import {TaskStatus} from "./tasks-status.enum";

@Injectable()
export class TasksService {

    // private tasks: Task[] = [];
    //
    // getAllTasks() {
    //     return this.tasks;
    // }
    //
    // getTasksByFilter(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search  } = filterDto;
    //
    //     let tasks = this.getAllTasks();
    //     if(status) {
    //         tasks = this.tasks.filter( task => status === task.status)
    //     }
    //     if(search) {
    //         tasks = this.tasks.filter( task => task.title.includes(search) || task.description.includes(search));
    //     }
    //
    //     return tasks;
    // }
    //
    // createTask(createTaskDto: CreateTaskDto) {
    //     const {title, description} = createTaskDto;
    //
    //     const task: Task =  {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }
    //
    // getTaskById(id: string): Task {
    //    const found =  this.getAllTasks().find(task => id === task.id);
    //     if(!found) {
    //         throw new NotFoundException(`Task with ID ${id} not found`);
    //     }
    //     return found;
    // }
    //
    // deleteTaskById(id: string) {
    //    const found = this.getTaskById(id);
    //    this.tasks = this.getAllTasks().filter(task =>  task.id !== found.id )
    // }
    //

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository

    ) {}

    async getTaskById(id: number): Promise<Task> {
       const found =  await this.taskRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    async updateTaskStatusById(id: number, taskStatus: TaskStatus): Promise<Task> {

       const task = await this.getTaskById(id);
       if(task) {
           task.status = taskStatus;
           await task.save();
           return task;
       }
    }

    async getTasks(getTaskFilter: GetTaskFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(getTaskFilter);
    }


}
