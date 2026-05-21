import { IsArray, IsInt } from 'class-validator';

export class AsignarExamenesDto {
  @IsInt()
  examenId: number;

  @IsArray()
  @IsInt({ each: true })
  alumnoIds: number[];
}
