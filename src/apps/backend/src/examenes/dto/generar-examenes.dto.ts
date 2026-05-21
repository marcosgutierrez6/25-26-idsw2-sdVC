import { IsInt, IsString, IsNotEmpty, IsArray, IsEnum } from 'class-validator';
import { Evaluacion } from '@prisma/client';

export class GenerarExamenesDto {
  @IsInt()
  asignaturaId: number;

  @IsArray()
  @IsString({ each: true })
  temas: string[];

  @IsInt()
  numeroExamenes: number;

  @IsInt()
  numeroPreguntas: number;

  @IsEnum(Evaluacion)
  evaluacion: Evaluacion;

  @IsInt()
  proporcionFacil: number;

  @IsInt()
  proporcionMedia: number;

  @IsInt()
  proporcionDificil: number;
}
