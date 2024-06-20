import { Module } from '@nestjs/common';
import { VerificacaoService } from './verificacao.service';
import { VerificacaoController } from './verificacao.controller';
import { PrismaService } from 'src/database/PrismaService';
import { MailerModule } from '../mailer/mailer.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [VerificacaoController],
  providers: [VerificacaoService, PrismaService],
  exports:[VerificacaoService],
  imports: [MailerModule]
})
export class VerificacaoModule {}