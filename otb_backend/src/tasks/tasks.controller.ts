import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    // @Get()
    // getAllTasks(): Task[]{
    //     return this.tasksService.getAllTasks();
    // }

    // Get tasks with optional filters
    @Get()
    getTasks(@Query() filterDTO: GetTasksFilterDTO): Task[] {
        console.log("getting tasks with filters", filterDTO);
        if(Object.keys(filterDTO).length) {
            return this.tasksService.getTasksWithFilters(filterDTO);
        }

        return this.tasksService.getAllTasks();
    }

    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string    
    // ): Task {
    //     return this.tasksService.createTask(title, description);
    // }

    @Post()
    createTask(
        @Body() createTaskDTO: CreateTaskDTO    
    ): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Get('/:id')
    getTaskById(/*@Body('id') or */@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(/*@Body('id') or */@Param('id') id: string): void {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
