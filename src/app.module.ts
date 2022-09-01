import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodolistModule } from './todolist/todolist.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
    imports: [AuthModule, TodolistModule],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
