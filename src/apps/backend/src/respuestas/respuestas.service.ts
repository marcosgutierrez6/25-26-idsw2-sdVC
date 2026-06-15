import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';

@Injectable()
export class RespuestasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRespuestaDto: CreateRespuestaDto) {
    const count = await this.prisma.respuesta.count({
      where: { preguntaId: createRespuestaDto.preguntaId },
    });
    if (count >= 5) {
      throw new BadRequestException('Máximo 5 respuestas por pregunta');
    }
    return this.prisma.respuesta.create({ data: createRespuestaDto });
  }

  findByPregunta(preguntaId: number) {
    return this.prisma.respuesta.findMany({ where: { preguntaId } });
  }

  async findOne(id: number) {
    const respuesta = await this.prisma.respuesta.findUnique({ where: { id } });
    if (!respuesta) throw new NotFoundException('Respuesta no encontrada');
    return respuesta;
  }

  async update(id: number, updateRespuestaDto: UpdateRespuestaDto) {
    await this.findOne(id);
    return this.prisma.respuesta.update({ where: { id }, data: updateRespuestaDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.respuesta.delete({ where: { id } });
  }
}
