import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GradosService } from './grados.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('grados')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GradosController {
  constructor(private readonly gradosService: GradosService) {}

  @Post()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  create(@Body() createGradoDto: CreateGradoDto) {
    return this.gradosService.create(createGradoDto);
  }

  @Get()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findAll() {
    return this.gradosService.findAll();
  }

  @Get(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findOne(@Param('id') id: string) {
    return this.gradosService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  update(@Param('id') id: string, @Body() updateGradoDto: UpdateGradoDto) {
    return this.gradosService.update(+id, updateGradoDto);
  }

  @Delete(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  remove(@Param('id') id: string) {
    return this.gradosService.remove(+id);
  }
}
