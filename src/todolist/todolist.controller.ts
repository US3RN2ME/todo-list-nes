import {
    Controller,
    Get,
    UseGuards,
    Post,
    Body,
    Req,
    Delete,
    Param,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import {
    CreateListDto,
    DeleteListDto,
    TodoListDto,
    TodoListIdDto,
} from './todolist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto, TodoDto } from '../todo/todo.dto';
import { TodoService } from '../todo/todo.serivce';

@ApiBearerAuth()
@ApiTags('lists')
@UseGuards(JwtAuthGuard)
@Controller('lists')
export class TodolistController {
    constructor(
        private readonly todolistService: TodolistService,
        private readonly todoService: TodoService
    ) {}

    @Get()
    async getLists(@Req() { user }): Promise<TodoListDto[]> {
        return await this.todolistService.getByUserId(user);
    }

    @Get(':id')
    async getTodos(@Param() { id }: TodoListIdDto): Promise<TodoDto[]> {
        return await this.todoService.getTodosByListId(id);
    }

    @Post(':id')
    async addTodo(
        @Param() { id }: TodoListIdDto,
        @Body() { name }: CreateTodoDto
    ): Promise<TodoDto> {
        return await this.todoService.addTodo(id, name);
    }

    @Post()
    async addList(
        @Body() { name }: CreateListDto,
        @Req() { user }
    ): Promise<TodoListDto> {
        return await this.todolistService.addTodoList(user, name);
    }

    @Delete(':id')
    async deleteList(@Param() { id }: DeleteListDto): Promise<{ id: string }> {
        return await this.todolistService.deleteTodoList(id);
    }
}
