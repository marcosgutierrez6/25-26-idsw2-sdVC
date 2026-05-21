import { IsEnum, IsInt } from 'class-validator';
import { Evaluacion } from '@prisma/client';

export class CreateExamenDto {
  @IsEnum(Evaluacion)
  evaluacion: Evaluacion;

  @IsInt()
  asignaturaId: number;
}
