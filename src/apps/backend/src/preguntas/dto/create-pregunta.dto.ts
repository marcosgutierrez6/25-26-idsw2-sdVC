import { IsString, IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { Dificultad } from '@prisma/client';

export class CreatePreguntaDto {
  @IsString()
  @IsNotEmpty()
  enunciado: string;

  @IsString()
  @IsNotEmpty()
  tema: string;

  @IsEnum(Dificultad)
  dificultad: Dificultad;

  @IsInt()
  bateriaId: number;
}
