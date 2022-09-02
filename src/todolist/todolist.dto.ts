import { IsNotEmpty } from 'class-validator';
import { IsUUID } from '@nestjs/class-validator';

export class AddListDto {
    @IsNotEmpty()
    name: string;
}

export class DeleteListDto {
    @IsUUID()
    id: string;
}
