import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/api/v1');

    await app.get(PrismaService).enableShutdownHooks(app);

    const config = new DocumentBuilder()
        .setTitle('Todo List')
        .setDescription('Todo List API description')
        .setVersion('1.0')
        .addTag('todolist')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(8080);
}
bootstrap();
