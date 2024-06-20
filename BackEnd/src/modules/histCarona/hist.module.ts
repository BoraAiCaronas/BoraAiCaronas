import { Module } from '@nestjs/common';
import { HistCaronasController } from './hist.controller';
import { HistCaronasService } from './hist.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [HistCaronasController],
  providers: [HistCaronasService, PrismaService],
})
export class HistCaronasModule {}
