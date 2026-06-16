import { IsArray, IsInt } from 'class-validator';

export class AsignarBulkExamenesDto {
  @IsArray()
  @IsInt({ each: true })
  examenIds: number[];

  @IsArray()
  @IsInt({ each: true })
  alumnoIds: number[];
}
