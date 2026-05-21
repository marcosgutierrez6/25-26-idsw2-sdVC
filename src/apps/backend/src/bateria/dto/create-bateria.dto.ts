import { IsInt } from 'class-validator';

export class CreateBateriaDto {
  @IsInt()
  asignaturaId: number;
}
