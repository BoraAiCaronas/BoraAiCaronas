import { Module } from '@nestjs/common';
import { CorridaController } from './corrida.controller';
import { CorridaService } from './corrida.service';
import { PrismaService } from 'src/database/PrismaService';
import { AvaliacaoService } from '../avaliacao/avaliacao.service';

@Module({
  controllers: [CorridaController],
  providers: [CorridaService, AvaliacaoService, PrismaService]
})
export class CorridaModule {}
