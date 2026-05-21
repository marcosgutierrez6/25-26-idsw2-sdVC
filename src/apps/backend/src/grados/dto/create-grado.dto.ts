import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGradoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;
}
