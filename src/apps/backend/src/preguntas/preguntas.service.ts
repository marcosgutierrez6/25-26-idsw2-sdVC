import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';

@Injectable()
export class PreguntasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPreguntaDto: CreatePreguntaDto) {
    return this.prisma.pregunta.create({ data: createPreguntaDto });
  }

  async findAll(filters?: PaginationDto & { tema?: string; dificultad?: string; bateriaId?: string }) {
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = {
      ...(filters?.tema && { tema: filters.tema }),
      ...(filters?.dificultad && { dificultad: filters.dificultad as any }),
      ...(filters?.bateriaId && { bateriaId: +filters.bateriaId }),
    };

    const [data, total] = await Promise.all([
      this.prisma.pregunta.findMany({
        where,
        skip,
        take: limit,
        include: { respuestas: true, bateria: { include: { asignatura: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.pregunta.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
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
