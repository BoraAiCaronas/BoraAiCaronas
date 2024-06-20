import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { veiculoDTO } from './veiculo.dto';

@Injectable()
export class VeiculoService {
  constructor(private prisma: PrismaService) {}

  async create(veiculoData: veiculoDTO) {
    const existingVeiculo = await this.prisma.veiculo.findFirst({
      where: {
        placa: veiculoData.placa,
      },
    });
    const existingVeiculoofuser = await this.prisma.veiculo.findFirst({
      where: {
        userId: veiculoData.userId,
      },
    });

    if (existingVeiculoofuser) {
      throw new NotFoundException(
        'Já existe um veículo cadastrado para este usuário.',
      );
    }

    if (existingVeiculo) {
      throw new HttpException(
        'Já existe um veículo com esta placa.',
        HttpStatus.CONFLICT,
      );
    }

    return this.prisma.veiculo.create({
      data: {
        userId: veiculoData.userId,
        nomeDoVeiculo: veiculoData.nomeDoVeiculo,
        placa: veiculoData.placa,
        DescVeiculo: veiculoData.DescVeiculo,
      },
    });
  }

  async delete(id: number) {
    const veiculoExist = await this.prisma.veiculo.findUnique({
      where: {
        id,
      },
    });

    if (!veiculoExist) {
      throw new NotFoundException('Veículo não encontrado.');
    }

    return this.prisma.veiculo.delete({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prisma.veiculo.findMany();
  }

  async findByUserId(userId: number) {
    return this.prisma.veiculo.findFirst({
      where: {
        userId: userId,
      },
    });
  }
}
