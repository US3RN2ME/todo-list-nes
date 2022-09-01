import { TodoService } from './todo.serivce';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddTodoDto, TodoIdDto } from './todo.dto';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTodos(@Body() dto: TodoIdDto) {
        return await this.todoService.getTodosByUserId(dto.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTodos(@Body() dto: TodoIdDto) {
        return await this.todoService.getTodosByListId(dto.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addTodo(@Body() dto: AddTodoDto) {
        return await this.todoService.addTodo(dto.listId, dto.name);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateTodo(@Body() dto: AddTodoDto) {
        return await this.todoService.updateTodo(dto.listId, dto.name);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async completeTodo(@Body() dto: TodoIdDto) {
        return await this.todoService.completeTodo(dto.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async deleteTodo(@Body() dto: TodoIdDto) {
        return await this.todoService.deleteTodo(dto.id);
    }
}
