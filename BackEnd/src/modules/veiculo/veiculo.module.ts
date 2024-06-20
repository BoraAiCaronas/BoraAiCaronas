import { Module } from '@nestjs/common';
import { veiculoController } from './veiculo.controller';
import { VeiculoService } from './veiculo.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [veiculoController],
  providers: [VeiculoService, PrismaService],
})
export class VeiculoModule {}
