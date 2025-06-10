import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ){}
    
    async getTaskById(id: string): Promise<Task> {
        console.log("SEARCHING FOR TASK WITH id", id);

        // Check for 32 characters (no dashes)
        if (id.replace(/-/g, '').length !== 32) {
            throw new BadRequestException('ID must be a valid UUID (32 hex characters)');
        }
        else
        {
            const found = await this.tasksRepository.findOne({ where: { id } });
            if (!found) {
                throw new NotFoundException(`Task with ID "${id}" not found`);
            }

            return found;
        }
    }

    createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDTO;
        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        return this.tasksRepository.save(task);
    }  

    deleteTask(id: string): Promise<void> {
        return this.getTaskById(id).then(task => {
            return this.tasksRepository.remove(task).then(() => {
                console.log(`Task with ID "${id}" has been deleted.`);
            });
        }).catch(err => {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        });
    }

    updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        return this.getTaskById(id).then(task => {
            task.status = status;
            return this.tasksRepository.save(task);
        }
        ).catch(err => {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        });
    }

    getTasksWithFilters(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        const { status, search } = filterDTO;
        const query = this.tasksRepository.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }
        return query.getMany();
    }
    
    getAllTasks(): Promise<Task[]> {
        return this.tasksRepository.find();
    }


    //***************************************************************************************************
    //**************************** Before Database Connection  ******************************************
    //***************************************************************************************************
    //***************************************************************************************************
    // private tasks: Task[] = [];
    
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    //     const { status, search } = filterDTO;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter((task) => 
    //             task.title.includes(search) || task.description.includes(search)
    //         );
    //     }
    //     return tasks;
    // }


    // // createTask(title: string, description: string): Task {
    // //     const task: Task = {
    // //         id: uuid(),
    // //         title,
    // //         description,
    // //         status: TaskStatus.OPEN,
    // //     };
        
    // //     this.tasks.push(task);
        
    // //     return task;
    // // }

    // // implementing the createTask method using CreateTaskDTO
    // createTask(createTaskDTO: CreateTaskDTO) {
    //     const { title, description } = createTaskDTO;
        
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
        
    //     this.tasks.push(task);
        
    //     return task;
    // }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find((task) => task.id === id);
        
    //     if (!found) {
    //         // this maps the error to the http response (sends 404 Not Found)
    //         throw new NotFoundException();// throw new Error(`Task with ID "${id}" not found`);
    //     }
        
    //     return found;
    // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);

    //     if(!found) {
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }
        
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
        
    //     console.log(`Task with ID "${id}" has been deleted.`);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
        
    //     task.status = status;
        
    //     return task;
    // }
}
