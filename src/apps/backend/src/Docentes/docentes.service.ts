import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';

@Injectable()
export class DocentesService {
  constructor(private readonly prisma: PrismaService) {}

  async crearDocente(createDocenteDto: CreateDocenteDto) {
    const hashedPassword = await bcrypt.hash(createDocenteDto.password, 10);
    return this.prisma.profesor.create({
      data: { ...createDocenteDto, password: hashedPassword },
    });
  }

  async verDocentes(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.profesor.findMany({
        skip,
        take: limit,
        omit: { password: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.profesor.count(),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async verDocente(id: number) {
    const profesor = await this.prisma.profesor.findUnique({
      where: { id },
      omit: { password: true },
      include: { asignaturas: true },
    });
    if (!profesor) throw new NotFoundException('Docente no encontrado');
    return profesor;
  }

  async editarDocente(id: number, updateDocenteDto: UpdateDocenteDto) {
    await this.verDocente(id);
    const data: any = { ...updateDocenteDto };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.profesor.update({
      where: { id },
      data,
      omit: { password: true },
    });
  }

  async eliminarDocente(id: number) {
    await this.verDocente(id);
    return this.prisma.profesor.delete({ where: { id } });
  }
}
