import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('respuestas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  @Get()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  index(@Query() pagination: PaginationDto) {
    return this.respuestasService.findAll(pagination);
  }

  @Get('pregunta/:preguntaId')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findByPregunta(@Param('preguntaId') preguntaId: string) {
    return this.respuestasService.findByPregunta(+preguntaId);
  }

  @Get(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  show(@Param('id') id: string) {
    return this.respuestasService.findOne(+id);
  }

  @Post()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  create(@Body() createRespuestaDto: CreateRespuestaDto) {
    return this.respuestasService.create(createRespuestaDto);
  }

  @Patch(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  update(@Param('id') id: string, @Body() updateRespuestaDto: UpdateRespuestaDto) {
    return this.respuestasService.update(+id, updateRespuestaDto);
  }

  @Delete(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  delete(@Param('id') id: string) {
    return this.respuestasService.remove(+id);
  }
}
