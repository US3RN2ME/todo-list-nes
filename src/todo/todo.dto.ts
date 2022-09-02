import { IsNotEmpty } from 'class-validator';
import { IsUUID } from '@nestjs/class-validator';

export class TodoIdDto {
    @IsUUID()
    id: string;
}

export class AddTodoDto extends TodoIdDto {
    @IsNotEmpty()
    name: string;
}
