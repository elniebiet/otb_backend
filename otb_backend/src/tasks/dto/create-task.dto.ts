import { IsNotEmpty } from "class-validator";

export class CreateTaskDTO {
    @IsNotEmpty() //class validator to ensure the field is not empty
    title: string;

    @IsNotEmpty()
    description: string;
}