import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() dto: UserDto): Promise<AuthDto> {
        const token = await this.authService.validateLogin(dto);
        return { token };
    }

    @Post('register')
    async register(@Body() dto: UserDto) {
        await this.authService.validateRegister(dto);
    }
}
