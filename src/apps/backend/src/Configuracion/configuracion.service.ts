import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { ImportarConfigDto } from './dto/importar-config.dto';

@Injectable()
export class ConfiguracionService {
  constructor(private readonly prisma: PrismaService) {}

  async importar(dto: ImportarConfigDto) {
    const resultado: Record<string, { creados: number; omitidos: number }> = {};

    if (dto.grados?.length) {
      const grados = await this.prisma.grado.createMany({
        data: dto.grados.map((g) => ({ titulo: g.titulo, codigo: g.codigo })),
        skipDuplicates: true,
      });
      resultado.grados = { creados: grados.count, omitidos: dto.grados.length - grados.count };
    }

    if (dto.asignaturas?.length) {
      const grados = await this.prisma.grado.findMany({
        where: { codigo: { in: [...new Set(dto.asignaturas.map((a) => a.gradoCodigo))] } },
      });
      const gradoMap = new Map(grados.map((g) => [g.codigo, g.id]));

      const profesores = dto.asignaturas.some((a) => a.profesorDni)
        ? await this.prisma.profesor.findMany({
            where: { dni: { in: dto.asignaturas.map((a) => a.profesorDni).filter(Boolean) as string[] } },
          })
        : [];
      const profeMap = new Map(profesores.map((p) => [p.dni, p.id]));

      const asignaturas = await this.prisma.asignatura.createMany({
        data: dto.asignaturas.map((a) => ({
          titulo: a.titulo,
          codigo: a.codigo,
          cursoAcademico: a.cursoAcademico,
          gradoId: gradoMap.get(a.gradoCodigo) ?? 0,
          profesorId: a.profesorDni ? (profeMap.get(a.profesorDni) ?? null) : null,
        })),
        skipDuplicates: true,
      });
      resultado.asignaturas = { creados: asignaturas.count, omitidos: dto.asignaturas.length - asignaturas.count };
    }

    if (dto.alumnos?.length) {
      const grados = await this.prisma.grado.findMany({
        where: { codigo: { in: [...new Set(dto.alumnos.map((a) => a.gradoCodigo))] } },
      });
      const gradoMap = new Map(grados.map((g) => [g.codigo, g.id]));

      const alumnos = await this.prisma.alumno.createMany({
        data: dto.alumnos.map((a) => ({
          nombre: a.nombre,
          apellidos: a.apellidos,
          dni: a.dni,
          email: a.email,
          gradoId: gradoMap.get(a.gradoCodigo) ?? 0,
        })),
        skipDuplicates: true,
      });
      resultado.alumnos = { creados: alumnos.count, omitidos: dto.alumnos.length - alumnos.count };
    }

    if (dto.baterias?.length) {
      const asignaturas = await this.prisma.asignatura.findMany({
        where: { codigo: { in: [...new Set(dto.baterias.map((b) => b.asignaturaCodigo))] } },
      });
      const asigMap = new Map(asignaturas.map((a) => [a.codigo, a.id]));

      let creadas = 0;
      let omitidas = 0;
      for (const bateria of dto.baterias) {
        const asignaturaId = asigMap.get(bateria.asignaturaCodigo);
        if (!asignaturaId) { omitidas++; continue; }

        const existente = await this.prisma.bateriaDePreguntas.findUnique({
          where: { asignaturaId },
        });
        if (existente) { omitidas++; continue; }

        await this.prisma.bateriaDePreguntas.create({
          data: {
            asignaturaId,
            preguntas: {
              create: bateria.preguntas.map((p) => ({
                enunciado: p.enunciado,
                tema: p.tema,
                dificultad: p.dificultad,
                respuestas: {
                  create: p.respuestas.map((r) => ({
                    opcion: r.opcion,
                    esCorrecta: r.esCorrecta,
                  })),
                },
              })),
            },
          },
        });
        creadas += bateria.preguntas.length;
      }
      resultado.baterias = { creados: creadas, omitidos: omitidas };
    }

    return resultado;
  }

  async exportar() {
    const [grados, alumnos, baterias] = await Promise.all([
      this.prisma.grado.findMany({
        include: { asignaturas: true },
        orderBy: { id: 'asc' },
      }),
      this.prisma.alumno.findMany({
        include: { grado: true },
        orderBy: { id: 'asc' },
      }),
      this.prisma.bateriaDePreguntas.findMany({
        include: {
          asignatura: true,
          preguntas: {
            include: { respuestas: true },
            orderBy: { id: 'asc' },
          },
        },
        orderBy: { id: 'asc' },
      }),
    ]);

    return {
      grados: grados.map((g) => ({
        titulo: g.titulo,
        codigo: g.codigo,
        asignaturas: g.asignaturas.map((a) => ({
          titulo: a.titulo,
          codigo: a.codigo,
          cursoAcademico: a.cursoAcademico,
        })),
      })),
      alumnos: alumnos.map((a) => ({
        nombre: a.nombre,
        apellidos: a.apellidos,
        dni: a.dni,
        email: a.email,
        grado: a.grado.codigo,
      })),
      baterias: baterias.map((b) => ({
        asignatura: b.asignatura.codigo,
        preguntas: b.preguntas.map((p) => ({
          enunciado: p.enunciado,
          tema: p.tema,
          dificultad: p.dificultad,
          respuestas: p.respuestas.map((r) => ({
            opcion: r.opcion,
            esCorrecta: r.esCorrecta,
          })),
        })),
      })),
    };
  }
}
