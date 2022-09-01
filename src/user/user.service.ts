import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create({ email, password }: UserDto) {
        try {
            return await this.prisma.user.create({
                data: {
                    email,
                    password,
                    token: '',
                },
            });
        } catch (e) {
            throw new ConflictException('Unable to create User');
        }
    }

    async getByEmail(email: string) {
        try {
            return await this.prisma.user.findUnique({
                where: { email },
            });
        } catch (e) {
            throw new ConflictException('Unable to find User');
        }
    }

    async getById(id: string) {
        try {
            return await this.prisma.user.findUnique({
                where: { id },
            });
        } catch (e) {
            throw new ConflictException('Unable to find User');
        }
    }

    async getAll() {
        return await this.prisma.user.findMany();
    }
}
