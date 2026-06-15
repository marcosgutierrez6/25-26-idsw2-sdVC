import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateBateriaDto } from './dto/create-bateria.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';

@Injectable()
export class BateriaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBateriaDto: CreateBateriaDto) {
    return this.prisma.bateriaDePreguntas.create({ data: createBateriaDto });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.bateriaDePreguntas.findMany({
        skip,
        take: limit,
        include: { asignatura: true, _count: { select: { preguntas: true } } },
        orderBy: { id: 'asc' },
      }),
      this.prisma.bateriaDePreguntas.count(),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const bateria = await this.prisma.bateriaDePreguntas.findUnique({
      where: { id },
      include: {
        asignatura: true,
        preguntas: { include: { respuestas: true } },
      },
    });
    if (!bateria) throw new NotFoundException('Batería no encontrada');
    return bateria;
  }

  async findByAsignatura(asignaturaId: number) {
    const bateria = await this.prisma.bateriaDePreguntas.findUnique({
      where: { asignaturaId },
      include: {
        preguntas: { include: { respuestas: true } },
      },
    });
    if (!bateria) throw new NotFoundException('Batería no encontrada para esta asignatura');
    return bateria;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.bateriaDePreguntas.delete({ where: { id } });
  }
}
