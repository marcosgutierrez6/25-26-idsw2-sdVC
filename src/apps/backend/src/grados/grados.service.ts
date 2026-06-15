import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';

@Injectable()
export class GradosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGradoDto: CreateGradoDto) {
    return this.prisma.grado.create({ data: createGradoDto });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.grado.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.grado.count(),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const grado = await this.prisma.grado.findUnique({
      where: { id },
      include: { asignaturas: true, alumnos: true },
    });
    if (!grado) throw new NotFoundException('Grado no encontrado');
    return grado;
  }

  async update(id: number, updateGradoDto: UpdateGradoDto) {
    await this.findOne(id);
    return this.prisma.grado.update({ where: { id }, data: updateGradoDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.grado.delete({ where: { id } });
  }
}
