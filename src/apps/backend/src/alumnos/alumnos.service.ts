import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';

@Injectable()
export class AlumnosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAlumnoDto: CreateAlumnoDto) {
    return this.prisma.alumno.create({ data: createAlumnoDto });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const skip = (page - 1) * limit;
    const where = pagination?.gradoId ? { gradoId: pagination.gradoId } : {};

    const [data, total] = await Promise.all([
      this.prisma.alumno.findMany({
        skip,
        take: limit,
        where,
        include: { grado: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.alumno.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id },
      include: { grado: true, asignaturas: { include: { asignatura: true } } },
    });
    if (!alumno) throw new NotFoundException('Alumno no encontrado');
    return alumno;
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    await this.findOne(id);
    return this.prisma.alumno.update({ where: { id }, data: updateAlumnoDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.alumno.delete({ where: { id } });
  }
}
