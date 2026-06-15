import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BateriaService } from './bateria.service';
import { CreateBateriaDto } from './dto/create-bateria.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('bateria')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BateriaController {
  constructor(private readonly bateriaService: BateriaService) {}

  @Get()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  index(@Query() pagination: PaginationDto) {
    return this.bateriaService.findAll(pagination);
  }

  @Get('asignatura/:asignaturaId')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findByAsignatura(@Param('asignaturaId') asignaturaId: string) {
    return this.bateriaService.findByAsignatura(+asignaturaId);
  }

  @Get(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  show(@Param('id') id: string) {
    return this.bateriaService.findOne(+id);
  }

  @Post()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  create(@Body() createBateriaDto: CreateBateriaDto) {
    return this.bateriaService.create(createBateriaDto);
  }

  @Delete(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  delete(@Param('id') id: string) {
    return this.bateriaService.remove(+id);
  }
}
