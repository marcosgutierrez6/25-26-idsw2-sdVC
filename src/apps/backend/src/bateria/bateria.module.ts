import { Module } from '@nestjs/common';
import { BateriaService } from './bateria.service';
import { BateriaController } from './bateria.controller';

@Module({
  controllers: [BateriaController],
  providers: [BateriaService],
})
export class BateriaModule {}
