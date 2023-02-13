import { IsUUID, IsNotEmpty } from '@nestjs/class-validator';

export class TodoIdDto {
    @IsUUID()
    id: string;
}

export class UpdateTodoDto {
    @IsNotEmpty()
    name: string;
}

export class CreateTodoDto extends UpdateTodoDto {}

export class TodoDto {
    id: string;
    name: string;
    createdAt: Date;
    isComplete: boolean;
    todoListId: string;
}
