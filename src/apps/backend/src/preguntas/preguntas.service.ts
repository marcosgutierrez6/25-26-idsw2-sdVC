import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

@Injectable()
export class PreguntasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPreguntaDto: CreatePreguntaDto) {
    return this.prisma.pregunta.create({ data: createPreguntaDto });
  }

  findAll(filters?: { tema?: string; dificultad?: string; bateriaId?: string }) {
    return this.prisma.pregunta.findMany({
      where: {
        ...(filters?.tema && { tema: filters.tema }),
        ...(filters?.dificultad && { dificultad: filters.dificultad as any }),
        ...(filters?.bateriaId && { bateriaId: +filters.bateriaId }),
      },
      include: { respuestas: true, bateria: { include: { asignatura: true } } },
    });
  }

  async findOne(id: number) {
    const pregunta = await this.prisma.pregunta.findUnique({
      where: { id },
      include: { respuestas: true, bateria: { include: { asignatura: true } } },
    });
    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');
    return pregunta;
  }

  async update(id: number, updatePreguntaDto: UpdatePreguntaDto) {
    await this.findOne(id);
    return this.prisma.pregunta.update({ where: { id }, data: updatePreguntaDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.pregunta.delete({ where: { id } });
  }
}
