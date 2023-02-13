import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TodoListDto } from './todolist.dto';

@Injectable()
export class TodolistService {
    readonly select = {
        id: true,
        name: true,
        createdAt: true,
        todos: true,
    };

    constructor(private readonly prisma: PrismaService) {}

    async addTodoList(userId: string, name: string): Promise<TodoListDto> {
        try {
            return await this.prisma.todoList.create({
                data: {
                    name,
                    createdAt: new Date(),
                    user: { connect: { id: userId } },
                },
                select: { ...this.select },
            });
        } catch (e) {
            throw new ConflictException('Unable to create todolist');
        }
    }

    async deleteTodoList(id: string): Promise<{ id: string }> {
        try {
            await this.prisma.todo.deleteMany({
                where: { todoListId: id },
            });
            return await this.prisma.todoList.delete({
                where: { id },
                select: { id: true },
            });
        } catch (e) {
            throw new ConflictException('Unable to delete todolist');
        }
    }

    async getById(id: string): Promise<TodoListDto> {
        try {
            return await this.prisma.todoList.findUnique({
                where: { id },
                select: { ...this.select },
            });
        } catch (e) {
            throw new ConflictException('Unable to find todolist');
        }
    }

    async getByUserId(userId: string): Promise<TodoListDto[]> {
        try {
            return await this.prisma.todoList.findMany({
                where: { userId },
                select: { ...this.select },
            });
        } catch (e) {
            throw new ConflictException('Unable to find todolists');
        }
    }
}
