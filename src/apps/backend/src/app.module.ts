import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './Prisma/prisma.module';
import { AuthModule } from './Auth/auth.module';
import { GradosModule } from './Grados/grados.module';
import { AsignaturasModule } from './Asignaturas/asignaturas.module';
import { ProfesoresModule } from './Profesores/profesores.module';
import { AlumnosModule } from './Alumnos/alumnos.module';
import { PreguntasModule } from './Preguntas/preguntas.module';
import { RespuestasModule } from './Respuestas/respuestas.module';
import { ExamenesModule } from './Examenes/examenes.module';
import { BateriaModule } from './Bateria/bateria.module';
import { ConfiguracionModule } from './Configuracion/configuracion.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../../.env'),
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    GradosModule,
    AsignaturasModule,
    ProfesoresModule,
    AlumnosModule,
    PreguntasModule,
    RespuestasModule,
    ExamenesModule,
    BateriaModule,
    ConfiguracionModule,
  ],
})
export class AppModule {}
