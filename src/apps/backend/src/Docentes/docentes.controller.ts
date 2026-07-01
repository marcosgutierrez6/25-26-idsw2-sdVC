import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('docentes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Get()
  @Roles(Rol.ADMIN)
  verDocentes(@Query() pagination: PaginationDto) {
    return this.docentesService.verDocentes(pagination);
  }

  @Get(':id')
  @Roles(Rol.ADMIN)
  verDocente(@Param('id') id: string) {
    return this.docentesService.verDocente(+id);
  }

  @Post()
  @Roles(Rol.ADMIN)
  crearDocente(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docentesService.crearDocente(createDocenteDto);
  }

  @Patch(':id')
  @Roles(Rol.ADMIN)
  editarDocente(@Param('id') id: string, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docentesService.editarDocente(+id, updateDocenteDto);
  }

  @Delete(':id')
  @Roles(Rol.ADMIN)
  eliminarDocente(@Param('id') id: string) {
    return this.docentesService.eliminarDocente(+id);
  }
}
