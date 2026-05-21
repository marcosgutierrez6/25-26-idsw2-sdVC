import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('preguntas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Post()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  create(@Body() createPreguntaDto: CreatePreguntaDto) {
    return this.preguntasService.create(createPreguntaDto);
  }

  @Get()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findAll(
    @Query('tema') tema?: string,
    @Query('dificultad') dificultad?: string,
    @Query('bateriaId') bateriaId?: string,
  ) {
    return this.preguntasService.findAll({ tema, dificultad, bateriaId });
  }

  @Get(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findOne(@Param('id') id: string) {
    return this.preguntasService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  update(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    return this.preguntasService.update(+id, updatePreguntaDto);
  }

  @Delete(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  remove(@Param('id') id: string) {
    return this.preguntasService.remove(+id);
  }
}
