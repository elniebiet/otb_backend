import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid') // uuid will be automatically generated
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    status: TaskStatus;
    
//   constructor(title: string, description: string) {
//     this.title = title;
//     this.description = description;
//   }
}