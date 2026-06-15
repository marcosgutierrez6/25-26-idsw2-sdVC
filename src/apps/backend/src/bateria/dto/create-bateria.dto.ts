import { IsInt, IsString } from 'class-validator';

export class CreateBateriaDto {
  @IsString()
  nombre: string;

  @IsInt()
  asignaturaId: number;
}
