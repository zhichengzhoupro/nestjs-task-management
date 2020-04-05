import {EntityRepository, Repository} from "typeorm";
import {Task} from "./task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatus} from "./tasks-status.enum";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;

        const task: Task =  new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        return await this.save(task);
    }

    async getTasks(getTaskFilterDto: GetTaskFilterDto):  Promise<Task[]> {

        const {status, search} = getTaskFilterDto;

        const queryBuilder = this.createQueryBuilder('task');

        if(status) {
            queryBuilder.andWhere('task.status = :status', {'status' :  status})
        }

        if(search) {
            queryBuilder.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {'search': `%${search}%`});
        }

        const tasks = await  queryBuilder.getMany();

        return tasks;
    }

}