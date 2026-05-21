import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Injectable()
export class AlumnosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAlumnoDto: CreateAlumnoDto) {
    return this.prisma.alumno.create({ data: createAlumnoDto });
  }

  findAll() {
    return this.prisma.alumno.findMany({ include: { grado: true } });
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
