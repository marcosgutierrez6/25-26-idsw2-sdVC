import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfesorDto: CreateProfesorDto) {
    const hashedPassword = await bcrypt.hash(createProfesorDto.password, 10);
    return this.prisma.profesor.create({
      data: { ...createProfesorDto, password: hashedPassword },
    });
  }

  findAll() {
    return this.prisma.profesor.findMany({ omit: { password: true } });
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
