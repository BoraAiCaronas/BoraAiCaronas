import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { histDTO } from './hist.dto';

@Injectable()
export class HistCaronasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<histDTO[]> {
    return this.prisma.hist_caronas.findMany();
  }

  async findByUserId(userId: number): Promise<histDTO[]> {
    const parsedUserId = parseInt(String(userId), 10); // Converter para número inteiro
    return this.prisma.hist_caronas.findMany({
      where: { userId: { equals: parsedUserId } },
    });
  }
}
