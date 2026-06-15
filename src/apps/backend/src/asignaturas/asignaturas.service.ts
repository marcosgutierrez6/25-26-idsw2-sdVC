import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';

@Injectable()
export class AsignaturasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAsignaturaDto: CreateAsignaturaDto) {
    return this.prisma.asignatura.create({ data: createAsignaturaDto });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const skip = (page - 1) * limit;
    const where = pagination?.gradoId ? { gradoId: pagination.gradoId } : {};

    const [data, total] = await Promise.all([
      this.prisma.asignatura.findMany({
        skip,
        take: limit,
        where,
        include: { grado: true, profesor: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.asignatura.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
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
