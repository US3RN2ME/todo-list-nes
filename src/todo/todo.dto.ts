import { IsNotEmpty } from 'class-validator';

export class TodoIdDto {
    @IsNotEmpty()
    id: string;
}

export class AddTodoDto {
    @IsNotEmpty()
    listId: string;
    @IsNotEmpty()
    name: string;
}
