import { IsNotEmpty } from 'class-validator';

export class AddListDto {
    @IsNotEmpty()
    name: string;
}

export class DeleteListDto {
    @IsNotEmpty()
    id: string;
}
