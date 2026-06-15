import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { BateriaService } from './bateria.service';
import { CreateBateriaDto } from './dto/create-bateria.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('bateria')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BateriaController {
  constructor(private readonly bateriaService: BateriaService) {}

  @Post()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  create(@Body() createBateriaDto: CreateBateriaDto) {
    return this.bateriaService.create(createBateriaDto);
  }

  @Get()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findAll() {
    return this.bateriaService.findAll();
  }

  @Get(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findOne(@Param('id') id: string) {
    return this.bateriaService.findOne(+id);
  }

  @Get('asignatura/:asignaturaId')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findByAsignatura(@Param('asignaturaId') asignaturaId: string) {
    return this.bateriaService.findByAsignatura(+asignaturaId);
  }

  @Delete(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  remove(@Param('id') id: string) {
    return this.bateriaService.remove(+id);
  }
}
