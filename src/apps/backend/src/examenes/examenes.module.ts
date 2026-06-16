import { Module } from '@nestjs/common';
import { ExamenesService } from './examenes.service';
import { ExamenesController } from './examenes.controller';
import { HtmlPdfGeneratorService } from './html-pdf-generator.service';

@Module({
  controllers: [ExamenesController],
  providers: [ExamenesService, HtmlPdfGeneratorService],
})
export class ExamenesModule {}
