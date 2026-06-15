import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ExamenesService } from './examenes.service';
import { CreateExamenDto } from './dto/create-examen.dto';
import { GenerarExamenesDto } from './dto/generar-examenes.dto';
import { AsignarExamenesDto } from './dto/asignar-examenes.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';
import { CurrentUser } from '../Common/current-user.decorator';

@Controller('examenes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamenesController {
  constructor(private readonly examenesService: ExamenesService) {}

  @Post()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  create(@Body() createExamenDto: CreateExamenDto) {
    return this.examenesService.create(createExamenDto);
  }

  @Get()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findAll() {
    return this.examenesService.findAll();
  }

  @Get(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  findOne(@Param('id') id: string) {
    return this.examenesService.findOne(+id);
  }

  @Post('generar')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  generar(@Body() generarDto: GenerarExamenesDto) {
    return this.examenesService.generar(generarDto);
  }

  @Post('asignar')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  asignar(@Body() asignarDto: AsignarExamenesDto) {
    return this.examenesService.asignar(asignarDto);
  }

  @Post(':examenId/corregir/:alumnoId')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  corregir(
    @Param('examenId') examenId: string,
    @Param('alumnoId') alumnoId: string,
    @Body() body: { respuestas: { preguntaId: number; opcionId: number }[] },
  ) {
    return this.examenesService.corregir(+examenId, +alumnoId, body.respuestas);
  }

  @Get(':id/resultados')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  resultados(@Param('id') id: string) {
    return this.examenesService.resultados(+id);
  }

  @Delete(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  remove(@Param('id') id: string) {
    return this.examenesService.remove(+id);
  }
}
