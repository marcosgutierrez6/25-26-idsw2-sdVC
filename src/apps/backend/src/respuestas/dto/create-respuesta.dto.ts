import { IsString, IsNotEmpty, IsBoolean, IsInt } from 'class-validator';

export class CreateRespuestaDto {
  @IsString()
  @IsNotEmpty()
  opcion: string;

  @IsBoolean()
  esCorrecta: boolean;

  @IsInt()
  preguntaId: number;
}
