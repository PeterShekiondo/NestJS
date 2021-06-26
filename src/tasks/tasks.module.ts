import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepositoty } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([TaskRepositoty])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
