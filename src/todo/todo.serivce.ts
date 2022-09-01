import { PrismaService } from '../prisma/prisma.service';

export class TodoService {
    constructor(private readonly prisma: PrismaService) {}

    async getTodosByUserId(userId: string) {
        return await this.prisma.todoList.findMany({
            where: { userId },
            select: { todos: true, name: true },
        });
    }

    async getTodosByListId(todoListId: string) {
        return await this.prisma.todo.findMany({
            where: { todoListId },
        });
    }

    async getTodoById(id: string) {
        return await this.prisma.todo.findUnique({
            where: { id },
        });
    }

    async deleteTodo(id: string) {
        return this.prisma.todo.delete({
            where: { id },
        });
    }

    async updateTodo(id: string, name: string) {
        return this.prisma.todo.update({
            where: { id },
            data: { name },
        });
    }

    async completeTodo(id: string) {
        const todo = await this.getTodoById(id);
        if (!todo) return;
        return this.prisma.todo.update({
            where: { id },
            data: { isComplete: !todo.isComplete },
        });
    }

    async addTodo(todoListId: string, name: string) {
        return await this.prisma.todo.create({
            data: {
                name,
                createdAt: new Date(),
                todoList: { connect: { id: todoListId } },
            },
        });
    }
}
