import { TodoService } from './todo.serivce';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Put,
    UseGuards,
} from '@nestjs/common';
import { UpdateTodoDto, TodoDto, TodoIdDto } from './todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('todos')
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Put(':id')
    async updateTodo(
        @Param() { id }: TodoIdDto,
        @Body() { name }: UpdateTodoDto
    ): Promise<TodoDto> {
        return await this.todoService.updateTodo(id, name);
    }

    @Patch(':id')
    async completeTodo(@Param() { id }: TodoIdDto): Promise<TodoDto> {
        return await this.todoService.completeTodo(id);
    }

    @Delete(':id')
    async deleteTodo(@Param() { id }: TodoIdDto): Promise<TodoDto> {
        return await this.todoService.deleteTodo(id);
    }
}
