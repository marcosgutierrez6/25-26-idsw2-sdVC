import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';

@Injectable()
export class AsignaturasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAsignaturaDto: CreateAsignaturaDto) {
    return this.prisma.asignatura.create({ data: createAsignaturaDto });
  }

  findAll() {
    return this.prisma.asignatura.findMany({
      include: { grado: true, profesor: true },
    });
  }

  async findOne(id: number) {
    const asignatura = await this.prisma.asignatura.findUnique({
      where: { id },
      include: { grado: true, profesor: true, examenes: true, bateria: true },
    });
    if (!asignatura) throw new NotFoundException('Asignatura no encontrada');
    return asignatura;
  }

  async update(id: number, updateAsignaturaDto: UpdateAsignaturaDto) {
    await this.findOne(id);
    return this.prisma.asignatura.update({ where: { id }, data: updateAsignaturaDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.asignatura.delete({ where: { id } });
  }
}
