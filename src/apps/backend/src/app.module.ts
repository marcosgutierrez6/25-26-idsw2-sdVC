import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GradosModule } from './grados/grados.module';
import { AsignaturasModule } from './asignaturas/asignaturas.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { ExamenesModule } from './examenes/examenes.module';
import { BateriaModule } from './bateria/bateria.module';
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
  ],
})
export class AppModule {}
