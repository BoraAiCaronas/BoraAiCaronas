import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { MailerService } from '../mailer/mailer.service';
import { UserDTO } from '../user/user.dto';

@Injectable()
export class VerificacaoService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async create(user: UserDTO){

    const existingVerificacao = await this.prisma.verificacao_email.findFirst({
      where: {
        userId: user.id
      }
    })

    if (existingVerificacao) {
      throw new NotFoundException('Verificacao já existe');
    }

    const newToken = this.generateVerificacaoToken()

    const newVerificacao = await this.prisma.verificacao_email.create({
      data: {
        userId: user.id,
        token_verificacao: newToken,
      },
    })

    this.mailerService.sendVerificationEmail(user.id, user.email, newVerificacao.token_verificacao)

    return newVerificacao;
  }

  async confirmationVerification(idUser: number, verificacaoToken: String){

    const verificacao = await this.prisma.verificacao_email.findFirst({
      where: {
        userId: idUser,
      }
    })

    if (!verificacao || verificacao.token_verificacao !== verificacaoToken){
      
      return this.getHtmlFileAsString('../../../src/templates/verification_email_error.html')
    }

    if (verificacao.email_verificado == true){

      return this.getHtmlFileAsString('../../../src/templates/verification_email_already_verified.html')
    }

    const updateVerificacao = await this.prisma.verificacao_email.update({
      data: {
        email_verificado: true,
      },
      where: {
        id: verificacao.id,
      },
    });

    if (!updateVerificacao){

      return this.getHtmlFileAsString('../../../src/templates/verification_email_error.html')
    }

    return this.getHtmlFileAsString('../../../src/templates/verification_sucess.html')
  }

  async findByIdUser(idUser: number){

    const verificacao = await this.prisma.verificacao_email.findFirst({
      where: {
        userId: idUser
      }
    })

    if (!verificacao) {
      throw new Error('O verificão do usuário não existe!');
    }

    return verificacao
  }

  private getHtmlFileAsString(relativePathHtmlFile: string){

    return require('fs').readFileSync(require('path').resolve(__dirname, relativePathHtmlFile), 'utf8');
  }

  private generateVerificacaoToken() {

    return require("node:crypto").randomUUID();
  }
}
