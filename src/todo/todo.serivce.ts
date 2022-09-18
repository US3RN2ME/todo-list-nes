import { PrismaService } from '../prisma/prisma.service';
import { TodoDto } from './todo.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) {}

    async getTodosByUserId(userId: string): Promise<Todo[]> {
        try {
            return (
                await this.prisma.todoList.findMany({
                    where: { userId },
                    select: { todos: true },
                })
            ).flatMap((obj) => obj.todos);
        } catch (ex) {
            throw new ConflictException('Unable to get todos');
        }
    }

    async getTodosByListId(todoListId: string): Promise<TodoDto[]> {
        try {
            return await this.prisma.todo.findMany({
                where: { todoListId },
            });
        } catch (ex) {
            throw new ConflictException('Unable to get todos');
        }
    }

    async getTodoById(id: string): Promise<TodoDto> {
        try {
            return await this.prisma.todo.findUnique({
                where: { id },
            });
        } catch (ex) {
            throw new ConflictException('Unable to get todo');
        }
    }

    async deleteTodo(id: string): Promise<TodoDto> {
        try {
            return this.prisma.todo.delete({
                where: { id },
            });
        } catch (ex) {
            throw new ConflictException('Unable to delete todo');
        }
    }

    async updateTodo(id: string, name: string): Promise<TodoDto> {
        try {
            return this.prisma.todo.update({
                where: { id },
                data: { name },
            });
        } catch (ex) {
            throw new ConflictException('Unable to update todo');
        }
    }

    async completeTodo(id: string): Promise<TodoDto> {
        try {
            const todo = await this.getTodoById(id);
            if (!todo) return;
            return this.prisma.todo.update({
                where: { id },
                data: { isComplete: !todo.isComplete },
            });
        } catch (ex) {
            throw new ConflictException('Unable to update todos');
        }
    }

    async addTodo(todoListId: string, name: string): Promise<TodoDto> {
        try {
            return await this.prisma.todo.create({
                data: {
                    name,
                    createdAt: new Date(),
                    todoList: { connect: { id: todoListId } },
                },
            });
        } catch (ex) {
            throw new ConflictException('Unable to add todo');
        }
    }
}
