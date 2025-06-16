import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class UpdateTaskStatusDTO {
    @IsEnum(TaskStatus) // Ensure the status is one of the defined TaskStatus values
    status: TaskStatus;
}