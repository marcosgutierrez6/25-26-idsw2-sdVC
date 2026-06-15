import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class GradoImport {
  titulo: string;
  codigo: string;
}

class AsignaturaImport {
  titulo: string;
  codigo: string;
  cursoAcademico: string;
  gradoCodigo: string;
  profesorDni?: string;
}

class AlumnoImport {
  nombre: string;
  apellidos: string;
  dni: string;
  email: string;
  gradoCodigo: string;
}

class RespuestaImport {
  opcion: string;
  esCorrecta: boolean;
}

class PreguntaImport {
  enunciado: string;
  tema: string;
  dificultad: 'BAJA' | 'MEDIA' | 'ALTA';
  respuestas: RespuestaImport[];
}

class BateriaImport {
  asignaturaCodigo: string;
  preguntas: PreguntaImport[];
}

export class ImportarConfigDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GradoImport)
  grados?: GradoImport[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AsignaturaImport)
  asignaturas?: AsignaturaImport[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AlumnoImport)
  alumnos?: AlumnoImport[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BateriaImport)
  baterias?: BateriaImport[];
}
