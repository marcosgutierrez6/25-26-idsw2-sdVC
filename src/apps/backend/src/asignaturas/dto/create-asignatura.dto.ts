import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateAsignaturaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  cursoAcademico: string;

  @IsInt()
  gradoId: number;

  @IsInt()
  profesorId?: number;
}
