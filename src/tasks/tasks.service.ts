import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-tasks.dto';
import {v4 as uuid} from 'uuid'
import { GetTaskFilterDto } from './dto/get-tasks-fiilter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[] {
        return this.tasks;
    }

    getTasksWithFilter(fileterDto: GetTaskFilterDto):Task[]{
        const {status, search} = fileterDto  //Destracting filterDto
       
        let tasks = this.getAllTasks()

        if(status){
            tasks = tasks.filter(task => task.status === status)
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) ||
            task.description.includes(search)
            )
        }

        return tasks
    }

    createTask(CreateTaskDto: CreateTaskDto):Task{
        const {title, description} = CreateTaskDto  //Destracting creteTaskDto

        const task:Task = {
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    getTaskByID(id:string):Task {
        let found = this.tasks.find(task=> task.id === id)
        if(!found){
            throw new NotFoundException('oops..! There is no Task with such ID')
        }
        return found
    }

    deleteTaskByID(id:string):void {
        let found = this.getTaskByID(id)
        this.tasks = this.tasks.filter(task=> task.id != found.id)
    }

    updateTaskStatus(id:string, status:TaskStatus):Task {
        const task = this.getTaskByID(id)
         task.status = status
         return task
    }
}
