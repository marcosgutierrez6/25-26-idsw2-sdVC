import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('preguntas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Get()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  index(
    @Query() pagination: PaginationDto,
    @Query('tema') tema?: string,
    @Query('dificultad') dificultad?: string,
    @Query('bateriaId') bateriaId?: string,
  ) {
    return this.preguntasService.findAll({ ...pagination, tema, dificultad, bateriaId });
  }

  @Get(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  show(@Param('id') id: string) {
    return this.preguntasService.findOne(+id);
  }

  @Post()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  create(@Body() createPreguntaDto: CreatePreguntaDto) {
    return this.preguntasService.create(createPreguntaDto);
  }

  @Patch(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  update(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    return this.preguntasService.update(+id, updatePreguntaDto);
  }

  @Delete(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  delete(@Param('id') id: string) {
    return this.preguntasService.remove(+id);
  }
}
