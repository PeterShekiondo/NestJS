import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus  } from './task-status.enum'
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-fiilter.dto';
import { TaskRepositoty } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
   
    constructor (
        @InjectRepository(TaskRepositoty)        // Injecting Taskrepository in an constructor to be used through out the service
        private taskRepository : TaskRepositoty
    ){}
   
    // private tasks:Task[] = [];

    // getAllTasks():Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilter(fileterDto: GetTaskFilterDto):Task[]{
    //     const {status, search} = fileterDto  //Destracting filterDto
       
    //     let tasks = this.getAllTasks()

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter(task => task.title.includes(search) ||
    //         task.description.includes(search)
    //         )
    //     }

    //     return tasks
    // }

    createTask(CreateTaskDto: CreateTaskDto):Promise<Task>{
        return this.taskRepository.createTask(CreateTaskDto)
    }

    async getTaskByID(id:number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)

        if(!found){
            throw new NotFoundException('oops..! There is no Task with such ID')
        }

        return found
    }

    // deleteTaskByID(id:string):void {
    //     let found = this.getTaskByID(id)
    //     this.tasks = this.tasks.filter(task=> task.id != found.id)
    // }

    // updateTaskStatus(id:string, status:TaskStatus):Task {
    //     const task = this.getTaskByID(id)
    //      task.status = status
    //      return task
    // }
}
