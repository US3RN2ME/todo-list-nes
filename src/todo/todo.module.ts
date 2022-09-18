import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.serivce';

@Module({
    imports: [PrismaModule, UserModule],
    controllers: [TodoController],
    providers: [TodoService, JwtStrategy],
    exports: [TodoService],
})
export class TodoModule {}
