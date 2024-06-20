import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/PrismaService';
import { VerificacaoModule } from '../verificacaoEmail/verificacao.module';
import { AvaliacaoService } from '../avaliacao/avaliacao.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [VerificacaoModule]
})
export class UserModule {}
