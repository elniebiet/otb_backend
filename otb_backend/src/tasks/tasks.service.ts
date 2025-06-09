import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
        const { status, search } = filterDTO;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }
        if (search) {
            tasks = tasks.filter((task) => 
                task.title.includes(search) || task.description.includes(search)
            );
        }
        return tasks;
    }


    // createTask(title: string, description: string): Task {
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
        
    //     this.tasks.push(task);
        
    //     return task;
    // }

    // implementing the createTask method using CreateTaskDTO
    createTask(createTaskDTO: CreateTaskDTO) {
        const { title, description } = createTaskDTO;
        
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        
        this.tasks.push(task);
        
        return task;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find((task) => task.id === id);
        
        if (!found) {
            throw new Error(`Task with ID "${id}" not found`);
        }
        
        return found;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        
        this.tasks = this.tasks.filter((task) => task.id !== found.id);
        
        console.log(`Task with ID "${id}" has been deleted.`);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        
        task.status = status;
        
        return task;
    }
}
