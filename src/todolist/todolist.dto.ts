import { IsNotEmpty } from 'class-validator';
import { TodoDto } from '../todo/todo.dto';
import { IsUUID } from '@nestjs/class-validator';

export class TodoListIdDto {
    @IsUUID()
    id: string;
}

export class CreateListDto {
    @IsNotEmpty()
    name: string;
}

export class DeleteListDto extends TodoListIdDto {}

export class TodoListDto {
    id: string;
    name: string;
    createdAt: Date;
    todos: TodoDto[];
}
