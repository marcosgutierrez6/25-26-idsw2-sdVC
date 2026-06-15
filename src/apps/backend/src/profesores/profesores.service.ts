import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';

@Injectable()
export class ProfesoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfesorDto: CreateProfesorDto) {
    const hashedPassword = await bcrypt.hash(createProfesorDto.password, 10);
    return this.prisma.profesor.create({
      data: { ...createProfesorDto, password: hashedPassword },
    });
  }

  async findAll(pagination?: PaginationDto) {
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

  async findOne(id: number) {
    const profesor = await this.prisma.profesor.findUnique({
      where: { id },
      omit: { password: true },
      include: { asignaturas: true },
    });
    if (!profesor) throw new NotFoundException('Profesor no encontrado');
    return profesor;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    await this.findOne(id);
    const data: any = { ...updateProfesorDto };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.profesor.update({
      where: { id },
      data,
      omit: { password: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.profesor.delete({ where: { id } });
  }
}
