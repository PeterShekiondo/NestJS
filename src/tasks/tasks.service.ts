import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskRepositoty } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskFilterDto } from './dto/get-tasks-fiilter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepositoty) // Injecting Taskrepository in an constructor to be used through out the service
    private taskRepository: TaskRepositoty,
  ) {}

  getTasks(filterDto: GetTaskFilterDto): Promise<any> {
    return this.taskRepository.getTasks(filterDto);
  }

  createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(CreateTaskDto);
  }

  async getTaskByID(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id); // Repository type ORM method for finding from row using ID

    if (!found) {
      throw new NotFoundException('oops..! There is no Task with such ID');
    }

    return found;
  }

  async deleteTaskByID(id: number): Promise<string> {
    const task = await this.taskRepository.delete(id); // Repository type ORM method for delete from the table
    if (task.affected === 0) {
      throw new NotFoundException('Task with ID ' + id + ' not found ');
    } else {
      const response = 'task with ID ' + id + ' has been deleted successively';
      return response;
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskByID(id); // all database operation must be async operation
    task.status = status;
    await task.save(); // all database operation must be async operation
    return task;
  }
}
