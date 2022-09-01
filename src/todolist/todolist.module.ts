import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [AuthModule, PrismaModule, UserModule],
    controllers: [TodolistController],
    providers: [TodolistService, JwtStrategy],
})
export class TodolistModule {}
