import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-tasks.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)                                     // define entity repo for tasks
export class TaskRepositoty extends Repository<Task> {

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