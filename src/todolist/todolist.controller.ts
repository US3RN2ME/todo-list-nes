import {
    Controller,
    Get,
    UseGuards,
    Post,
    Body,
    Req,
    Delete,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddListDto, DeleteListDto } from './todolist.dto';

@Controller('lists')
export class TodolistController {
    constructor(private readonly todolistService: TodolistService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getLists(@Req() req) {
        return this.todolistService.getByUserId(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addList(@Body() dto: AddListDto, @Req() req) {
        return await this.todolistService.addTodoList(req.user, dto.name);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteList(@Body() dto: DeleteListDto) {
        return await this.todolistService.deleteTodoList(dto.id);
    }
}
