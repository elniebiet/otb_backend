import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class UpdateTaskStatusDTO {
    @IsEnum(TaskStatus) // Ensure the status is one of the defined TaskStatus values
    status: TaskStatus;
}