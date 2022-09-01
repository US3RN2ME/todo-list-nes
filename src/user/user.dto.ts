import { IsEmail, MinLength } from '@nestjs/class-validator';

export class UserDto {
    @IsEmail()
    email: string;
    @MinLength(8)
    password: string;
}
