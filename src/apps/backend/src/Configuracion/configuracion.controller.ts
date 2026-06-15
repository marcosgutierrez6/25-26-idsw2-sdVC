import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { ImportarConfigDto } from './dto/importar-config.dto';
import { JwtAuthGuard } from '../Common/jwt-auth.guard';
import { RolesGuard } from '../Common/roles.guard';
import { Roles } from '../Common/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('configuracion')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Post('importar')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  importar(@Body() dto: ImportarConfigDto) {
    return this.configuracionService.importar(dto);
  }

  @Get('exportar')
  @Roles(Rol.DOCENTE, Rol.ADMIN)
  exportar() {
    return this.configuracionService.exportar();
  }
}
