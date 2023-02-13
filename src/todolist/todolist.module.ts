import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { TodoModule } from '../todo/todo.module';

@Module({
    imports: [PrismaModule, UserModule, TodoModule],
    controllers: [TodolistController],
    providers: [TodolistService, JwtStrategy],
})
export class TodolistModule {}
