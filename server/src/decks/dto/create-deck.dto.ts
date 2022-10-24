import { IsNotEmpty } from 'class-validator';

export class CreateDeckDto {
  @IsNotEmpty()
  title: string;
}
