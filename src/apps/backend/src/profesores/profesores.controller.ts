import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('profesores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Get()
  @Roles(Rol.ADMIN)
  index(@Query() pagination: PaginationDto) {
    return this.profesoresService.findAll(pagination);
  }

  @Get(':id')
  @Roles(Rol.ADMIN)
  show(@Param('id') id: string) {
    return this.profesoresService.findOne(+id);
  }

  @Post()
  @Roles(Rol.ADMIN)
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesoresService.create(createProfesorDto);
  }

  @Patch(':id')
  @Roles(Rol.ADMIN)
  update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
    return this.profesoresService.update(+id, updateProfesorDto);
  }

  @Delete(':id')
  @Roles(Rol.ADMIN)
  delete(@Param('id') id: string) {
    return this.profesoresService.remove(+id);
  }
}
