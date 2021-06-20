import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasts.module';

@Module({
  imports: [TasksModule],
})
export class AppModule {}
