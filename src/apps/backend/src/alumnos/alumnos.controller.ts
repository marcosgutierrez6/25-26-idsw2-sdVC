import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('alumnos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  create(@Body() createAlumnoDto: CreateAlumnoDto) {
    return this.alumnosService.create(createAlumnoDto);
  }

  @Get()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findAll() {
    return this.alumnosService.findAll();
  }

  @Get(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findOne(@Param('id') id: string) {
    return this.alumnosService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnosService.update(+id, updateAlumnoDto);
  }

  @Delete(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  remove(@Param('id') id: string) {
    return this.alumnosService.remove(+id);
  }
}
