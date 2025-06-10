import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]) // Specify entities here if needed, e.g., [Task]
  ],
  controllers: [TasksController],
  providers: [TasksService]
})

export class TasksModule {}
