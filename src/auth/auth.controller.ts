import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() dto: UserDto): Promise<string> {
        const token = await this.authService.validateLogin(dto);
        console.log('token: ' + token);
        return token || 'wrong email or password';
    }

    @Post('register')
    async register(@Body() dto: UserDto) {
        const user = await this.authService.validateRegister(dto);
        return user ? user.token : 'user exists';
    }

    @UseGuards(JwtAuthGuard)
    @Get('users')
    async users() {
        return await this.authService.getAllUsers();
    }
}
