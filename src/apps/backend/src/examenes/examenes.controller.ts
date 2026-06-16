import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExamenesService } from './examenes.service';
import { CreateExamenDto } from './dto/create-examen.dto';
import { UpdateExamenDto } from './dto/update-examen.dto';
import { GenerarExamenesDto } from './dto/generar-examenes.dto';
import { AsignarExamenesDto } from './dto/asignar-examenes.dto';
import { AsignarBulkExamenesDto } from './dto/asignar-bulk-examenes.dto';
import { PaginationDto } from '../Common/dto/pagination.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('examenes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamenesController {
  constructor(private readonly examenesService: ExamenesService) {}

  @Get()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  index(@Query() pagination: PaginationDto) {
    return this.examenesService.findAll({ ...pagination, asignaturaId: pagination.asignaturaId });
  }

  @Get(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  show(@Param('id') id: string) {
    return this.examenesService.findOne(+id);
  }

  @Post()
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  create(@Body() createExamenDto: CreateExamenDto) {
    return this.examenesService.create(createExamenDto);
  }

  @Patch(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  update(@Param('id') id: string, @Body() updateExamenDto: UpdateExamenDto) {
    return this.examenesService.update(+id, updateExamenDto);
  }

  @Delete(':id')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  delete(@Param('id') id: string) {
    return this.examenesService.remove(+id);
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

  @Post('asignar-bulk')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  asignarBulk(@Body() asignarBulkDto: AsignarBulkExamenesDto) {
    return this.examenesService.asignarBulk(asignarBulkDto);
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

  @Post('cancelar-generacion')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  cancelarGeneracion() {
    return this.examenesService.cancelarGeneracion();
  }

  @Get(':id/resultados')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  resultados(@Param('id') id: string) {
    return this.examenesService.resultados(+id);
  }

  @Post(':examenId/alumno/:alumnoId/pdf')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  @UseInterceptors(FileInterceptor('pdf'))
  cargarPdf(
    @Param('examenId') examenId: string,
    @Param('alumnoId') alumnoId: string,
    @UploadedFile() file: any,
  ) {
    return this.examenesService.cargarPdf(+examenId, +alumnoId, file);
  }

  @Post('exportar/lote')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  async exportarLotePdf(@Body() { examenIds }: { examenIds: number[] }, @Res() res: Response) {
    const pdfBuffer = await this.examenesService.generarPdfLote(examenIds);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="examenes_${Date.now()}.pdf"`);
    res.send(pdfBuffer);
  }
}
