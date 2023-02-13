import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateLogin({ email, password }: UserDto) {
        let user;
        try {
            user = await this.userService.getByEmail(email);
        } catch (ex) {
            throw new ConflictException('Wrong email');
        }
        if (!(await argon2.verify(user.password, password))) {
            throw new ConflictException('Wrong password');
        }
        return (user.token = await this.jwtService.signAsync({
            id: user.id,
        }));
    }

    async validateRegister({ email, password }: UserDto) {
        if (await this.userService.getByEmail(email)) {
            throw new ConflictException('User exists');
        }
        password = await argon2.hash(password);
        return await this.userService.create({ email, password });
    }
}
