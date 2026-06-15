import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';

@Injectable()
export class GradosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGradoDto: CreateGradoDto) {
    return this.prisma.grado.create({ data: createGradoDto });
  }

  findAll() {
    return this.prisma.grado.findMany();
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
