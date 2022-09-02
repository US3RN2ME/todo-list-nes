import { TodoService } from './todo.serivce';
import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { AddTodoDto, TodoIdDto } from './todo.dto';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtAuthGuard)
    @Get('all')
    async getAllTodos(@Req() { user }) {
        return await this.todoService.getTodosByUserId(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTodos(@Body() dto: TodoIdDto) {
        return await this.todoService.getTodosByListId(dto.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addTodo(@Body() dto: AddTodoDto) {
        return await this.todoService.addTodo(dto.id, dto.name);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateTodo(@Body() dto: AddTodoDto) {
        return await this.todoService.updateTodo(dto.id, dto.name);
    }

    @UseGuards(JwtAuthGuard)
    @Put('complete')
    async completeTodo(@Body() dto: TodoIdDto) {
        return await this.todoService.completeTodo(dto.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteTodo(@Body() dto: TodoIdDto) {
        return await this.todoService.deleteTodo(dto.id);
    }
}
