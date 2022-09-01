import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.dto';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateLogin({ email, password }: UserDto) {
        const user = await this.userService.getByEmail(email);
        if (user && (await argon2.verify(user.password, password))) {
            return (user.token = await this.jwtService.signAsync({
                id: user.id,
            }));
        }
    }

    async validateRegister({ email, password }: UserDto) {
        if (await this.userService.getByEmail(email)) return undefined;
        password = await argon2.hash(password);
        return await this.userService.create({ email, password });
    }

    async getAllUsers() {
        return await this.userService.getAll();
    }
}
