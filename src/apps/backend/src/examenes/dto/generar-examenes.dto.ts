import { IsInt, IsString, IsNotEmpty, IsArray, IsEnum, IsOptional } from 'class-validator';
import { Evaluacion } from '@prisma/client';

export class GenerarExamenesDto {
  @IsInt()
  asignaturaId: number;

  @IsArray()
  @IsInt({ each: true })
  bateriaIds: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  temas?: string[];

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
