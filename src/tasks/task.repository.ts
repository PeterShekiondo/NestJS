import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-tasks.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-fiilter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)                                     // define entity repo for tasks
export class TaskRepositoty extends Repository<Task> {

    async getTasks (filterDto:GetTaskFilterDto):Promise<Task[]>{
        const { status, search } = filterDto
        const query = this.createQueryBuilder('task')    // Query builder with a 'task' key

        if (status) {                 // variable   // value of the variable
            query.andWhere('task.status = :status', {status})
        }

        if (search) {
                            // If condition with an || operator between two parameters   // value of variable with percentage of likeness (the word should be partially or complete similar)
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
            
        }

        const tasks = await query.getMany()
        return tasks
    }

    async createTask (createTaskDto:CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto
        const task = new Task()             // Creating new task Entity object
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        await task.save()                  // Type ORM entity operation
        return task
    }

}