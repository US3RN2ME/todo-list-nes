import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodolistService {
    constructor(private readonly prisma: PrismaService) {}

    async addTodoList(userId: string, name: string) {
        try {
            return await this.prisma.todoList.create({
                data: {
                    name,
                    createdAt: new Date(),
                    user: { connect: { id: userId } },
                },
            });
        } catch (e) {
            console.log(e);
            throw new ConflictException('Unable to create todolist');
        }
    }

    async deleteTodoList(todoListId: string) {
        try {
            this.prisma.todo.deleteMany({
                where: { todoListId },
            });
            return this.prisma.todoList.delete({
                where: { id: todoListId },
            });
        } catch (e) {
            throw new ConflictException('Unable to delete todolist');
        }
    }

    async getById(id: string) {
        try {
            return await this.prisma.todoList.findUnique({
                where: { id },
            });
        } catch (e) {
            throw new ConflictException('Unable to find todolist');
        }
    }

    async getByUserId(userId: string) {
        try {
            return await this.prisma.todoList.findMany({
                where: { userId },
            });
        } catch (e) {
            throw new ConflictException('Unable to find todolists');
        }
    }
}
