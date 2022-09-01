import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.serivce';

@Module({
    imports: [AuthModule, PrismaModule, UserModule],
    controllers: [TodoController],
    providers: [TodoService, JwtStrategy],
})
export class TodoModule {}
