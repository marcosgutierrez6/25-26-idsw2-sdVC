import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBateriaDto } from './dto/create-bateria.dto';

@Injectable()
export class BateriaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBateriaDto: CreateBateriaDto) {
    return this.prisma.bateriaDePreguntas.create({ data: createBateriaDto });
  }

  findAll() {
    return this.prisma.bateriaDePreguntas.findMany({
      include: { asignatura: true, _count: { select: { preguntas: true } } },
    });
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
