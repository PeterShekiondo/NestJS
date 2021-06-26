import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-tasks-fiilter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus  } from './task-status.enum'
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor (private tasksService: TasksService) {}

    
    // @Get()
    // @UsePipes(ValidationPipe)
    // getTasks(@Query() filterDto: GetTaskFilterDto):Task[] {

    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilter(filterDto)
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto):Promise<Task>{

        return this.tasksService.createTask(CreateTaskDto)
   
    }

    @Get('/:id')
    getTasksByID(@Param('id', ParseIntPipe) id:number):Promise<Task>{
        return this.tasksService.getTaskByID(id)
    }

    @Delete('/:id')
    deleteTaskByID(@Param('id', ParseIntPipe) id:number):Promise<string>{
       return  this.tasksService.deleteTaskByID(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id:number, 
        @Body('status', TaskStatusValidationPipe) status:TaskStatus):Promise<Task>{
       return this.tasksService.updateTaskStatus(id, status)
    }
}
