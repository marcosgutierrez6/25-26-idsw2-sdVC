import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateExamenDto } from './dto/create-examen.dto';
import { UpdateExamenDto } from './dto/update-examen.dto';
import { GenerarExamenesDto } from './dto/generar-examenes.dto';
import { AsignarExamenesDto } from './dto/asignar-examenes.dto';
import { AsignarBulkExamenesDto } from './dto/asignar-bulk-examenes.dto';
import { EstadoExamen } from '@prisma/client';

@Injectable()
export class ExamenesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createExamenDto: CreateExamenDto) {
    return this.prisma.examen.create({ data: createExamenDto });
  }

  async findAll(pagination?: { page?: number; limit?: number; asignaturaId?: number }) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const skip = (page - 1) * limit;
    const where = pagination?.asignaturaId ? { asignaturaId: pagination.asignaturaId } : {};

    const [data, total] = await Promise.all([
      this.prisma.examen.findMany({
        where,
        skip,
        take: limit,
        include: { asignatura: true, _count: { select: { preguntas: true, alumnos: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.examen.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const examen = await this.prisma.examen.findUnique({
      where: { id },
      include: {
        asignatura: true,
        preguntas: { include: { pregunta: { include: { respuestas: true } } } },
        alumnos: { include: { alumno: true } },
      },
    });
    if (!examen) throw new NotFoundException('Examen no encontrado');
    return examen;
  }

  async update(id: number, updateExamenDto: UpdateExamenDto) {
    await this.findOne(id);
    return this.prisma.examen.update({ where: { id }, data: updateExamenDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.examen.delete({ where: { id } });
  }

  async generar(generarDto: GenerarExamenesDto) {
    const { asignaturaId, bateriaIds, temas, numeroExamenes, numeroPreguntas, evaluacion, proporcionFacil, proporcionMedia, proporcionDificil } = generarDto;

    const baterias = await this.prisma.bateriaDePreguntas.findMany({
      where: { id: { in: bateriaIds } },
      include: {
        preguntas: {
          include: {
            pregunta: true,
          },
        },
      },
    });

    if (!baterias.length) throw new NotFoundException('Baterías no encontradas');

    let todasLasPreguntas = baterias.flatMap((b) => b.preguntas);

    // Filtrar por tema si se especifica
    if (temas && temas.length > 0) {
      todasLasPreguntas = todasLasPreguntas.filter((p) => temas.includes(p.pregunta.tema));
    }

    // Filtrar por estado
    todasLasPreguntas = todasLasPreguntas.filter((p) => p.pregunta.estado === 'HABILITADA');
    if (todasLasPreguntas.length < numeroPreguntas) {
      throw new BadRequestException(`No hay suficientes preguntas habilitadas. Se encontraron ${todasLasPreguntas.length}, se necesitan ${numeroPreguntas}`);
    }

    const preguntasPorDificultad = {
      BAJA: todasLasPreguntas.filter((p) => p.pregunta.dificultad === 'BAJA'),
      MEDIA: todasLasPreguntas.filter((p) => p.pregunta.dificultad === 'MEDIA'),
      ALTA: todasLasPreguntas.filter((p) => p.pregunta.dificultad === 'ALTA'),
    };

    const totalProporcion = proporcionFacil + proporcionMedia + proporcionDificil;
    const examenesCreados = [];

    for (let i = 0; i < numeroExamenes; i++) {
      const preguntasSeleccionadas: any[] = [];
      const countFacil = Math.round((proporcionFacil / totalProporcion) * numeroPreguntas);
      const countMedia = Math.round((proporcionMedia / totalProporcion) * numeroPreguntas);
      const countDificil = numeroPreguntas - countFacil - countMedia;

      const shuffle = (arr: any[]) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      const seleccionFacil = shuffle(preguntasPorDificultad.BAJA).slice(0, countFacil);
      const seleccionMedia = shuffle(preguntasPorDificultad.MEDIA).slice(0, countMedia);
      const seleccionDificil = shuffle(preguntasPorDificultad.ALTA).slice(0, countDificil);

      preguntasSeleccionadas.push(...seleccionFacil, ...seleccionMedia, ...seleccionDificil);

      if (preguntasSeleccionadas.length < numeroPreguntas) {
        const seleccionadosIds = preguntasSeleccionadas.map((p) => p.preguntaId);
        const restantes = shuffle(
          todasLasPreguntas.filter((p) => !seleccionadosIds.includes(p.preguntaId)),
        );
        preguntasSeleccionadas.push(
          ...restantes.slice(0, numeroPreguntas - preguntasSeleccionadas.length),
        );
      }

      const examen = await this.prisma.examen.create({
        data: {
          evaluacion,
          asignaturaId,
          estado: EstadoExamen.GENERADO,
          preguntas: {
            create: preguntasSeleccionadas.slice(0, numeroPreguntas).map((p) => ({
              preguntaId: p.preguntaId,
            })),
          },
        },
        include: {
          preguntas: { include: { pregunta: { include: { respuestas: true } } } },
        },
      });

      examenesCreados.push(examen);
    }

    return examenesCreados;
  }

  async asignar(asignarDto: AsignarExamenesDto) {
    const { examenId, alumnoIds } = asignarDto;

    const examen = await this.prisma.examen.findUnique({
      where: { id: examenId },
      include: { preguntas: { include: { pregunta: { include: { respuestas: true } } } } },
    });

    if (!examen) throw new NotFoundException('Examen no encontrado');

    const ordenRespuestas = examen.preguntas.map((ep) =>
      ep.pregunta.respuestas
        .filter((r) => r.esCorrecta)
        .map((r) => r.id)
        .sort(),
    );

    const alumnoExamenes = [];
    for (const alumnoId of alumnoIds) {
      const hash = crypto
        .createHash('sha256')
        .update(`${examenId}-${alumnoId}-${JSON.stringify(ordenRespuestas)}-${Date.now()}`)
        .digest('hex');

      const ae = await this.prisma.alumnoExamen.create({
        data: {
          alumnoId,
          examenId,
          hashAsignacion: hash,
        },
      });

      alumnoExamenes.push(ae);
    }

    await this.prisma.examen.update({
      where: { id: examenId },
      data: { estado: EstadoExamen.ASIGNADO, claveCorreccion: JSON.stringify(ordenRespuestas) },
    });

    return { examenId, hash: ordenRespuestas, alumnosAsignados: alumnoExamenes.length };
  }

  async asignarBulk(asignarBulkDto: AsignarBulkExamenesDto) {
    const { examenIds, alumnoIds } = asignarBulkDto;

    const examenes = await this.prisma.examen.findMany({
      where: { id: { in: examenIds } },
      include: { preguntas: { include: { pregunta: { include: { respuestas: true } } } } },
    });

    if (examenes.length === 0) throw new NotFoundException('Exámenes no encontrados');

    const asignacionesCreadas: any[] = [];
    let alumnoIndex = 0;

    // Distribución round-robin: cada examen a un alumno diferente
    for (const examen of examenes) {
      const ordenRespuestas = examen.preguntas.map((ep) =>
        ep.pregunta.respuestas
          .filter((r) => r.esCorrecta)
          .map((r) => r.id)
          .sort(),
      );

      const alumnoId = alumnoIds[alumnoIndex % alumnoIds.length];

      const hash = crypto
        .createHash('sha256')
        .update(`${examen.id}-${alumnoId}-${JSON.stringify(ordenRespuestas)}-${Date.now()}`)
        .digest('hex');

      await this.prisma.alumnoExamen.create({
        data: {
          alumnoId,
          examenId: examen.id,
          hashAsignacion: hash,
        },
      });

      await this.prisma.examen.update({
        where: { id: examen.id },
        data: { estado: EstadoExamen.ASIGNADO, claveCorreccion: JSON.stringify(ordenRespuestas) },
      });

      asignacionesCreadas.push({
        examenId: examen.id,
        alumnoId,
      });

      alumnoIndex++;
    }

    return {
      examenesAsignados: examenIds.length,
      totalAsignaciones: examenIds.length,
      detalles: asignacionesCreadas,
    };
  }

  async corregir(examenId: number, alumnoId: number, respuestas: { preguntaId: number; opcionId: number }[]) {
    const ae = await this.prisma.alumnoExamen.findUnique({
      where: { alumnoId_examenId: { alumnoId, examenId } },
    });

    if (!ae) throw new NotFoundException('Asignación no encontrada');

    const examen = await this.prisma.examen.findUnique({
      where: { id: examenId },
      include: {
        preguntas: {
          include: { pregunta: { include: { respuestas: true } } },
        },
      },
    });

    if (!examen) throw new NotFoundException('Examen no encontrado');

    let aciertos = 0;
    let total = 0;
    const detalles: any[] = [];

    for (const ep of examen.preguntas) {
      total++;
      const respuestaCorrecta = ep.pregunta.respuestas.find((r) => r.esCorrecta);
      const respuestaAlumno = respuestas.find((r) => r.preguntaId === ep.preguntaId);
      const esCorrecto = respuestaAlumno?.opcionId === respuestaCorrecta?.id;
      if (esCorrecto) aciertos++;
      detalles.push({
        preguntaId: ep.preguntaId,
        enunciado: ep.pregunta.enunciado,
        respuestaCorrecta: respuestaCorrecta?.id,
        respuestaAlumno: respuestaAlumno?.opcionId,
        esCorrecto,
      });
    }

    const nota = (aciertos / total) * 10;

    await this.prisma.alumnoExamen.update({
      where: { alumnoId_examenId: { alumnoId, examenId } },
      data: {
        respuestas: JSON.stringify(respuestas),
        nota,
      },
    });

    const pendientes = await this.prisma.alumnoExamen.count({
      where: { examenId, nota: null },
    });

    const nuevoEstado = pendientes === 0 ? EstadoExamen.CORREGIDO : EstadoExamen.RESUELTO;
    await this.prisma.examen.update({
      where: { id: examenId },
      data: { estado: nuevoEstado },
    });

    return { nota, aciertos, total, detalles };
  }

  async cancelarGeneracion() {
    const eliminados = await this.prisma.examen.deleteMany({
      where: { estado: EstadoExamen.GENERADO },
    });
    return { message: `Generación cancelada: ${eliminados.count} examen(es) eliminado(s)` };
  }

  async resultados(examenId: number) {
    return this.prisma.alumnoExamen.findMany({
      where: { examenId },
      include: { alumno: true },
    });
  }

  async cargarPdf(examenId: number, alumnoId: number, file: any) {
    if (!file) throw new BadRequestException('No se proporcionó archivo PDF');

    const timestamp = Date.now();
    const filename = `examen_${examenId}_alumno_${alumnoId}_${timestamp}.pdf`;
    const pdfUrl = `/uploads/${filename}`;

    // En producción, aquí guardarías el archivo en S3 o similar
    // Por ahora, simplemente guardamos la URL en la BD
    // El archivo se guarda automáticamente por multer en uploads/

    await this.prisma.alumnoExamen.update({
      where: { alumnoId_examenId: { alumnoId, examenId } },
      data: { pdfUrl },
    });

    return { message: 'PDF cargado exitosamente', pdfUrl };
  }
}
