import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('profesores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Post()
  @Roles(Rol.ADMIN)
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesoresService.create(createProfesorDto);
  }

  @Get()
  @Roles(Rol.ADMIN)
  findAll() {
    return this.profesoresService.findAll();
  }

  @Get(':id')
  @Roles(Rol.ADMIN)
  findOne(@Param('id') id: string) {
    return this.profesoresService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Rol.ADMIN)
  update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
    return this.profesoresService.update(+id, updateProfesorDto);
  }

  @Delete(':id')
  @Roles(Rol.ADMIN)
  remove(@Param('id') id: string) {
    return this.profesoresService.remove(+id);
  }
}
