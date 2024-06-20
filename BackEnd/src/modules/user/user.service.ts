import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';
import { VerificacaoService } from 'src/modules/verificacaoEmail/verificacao.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private verficacaoEmailService: VerificacaoService,
  ) {}

  async create(userData: UserDTO) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(userData.email)) {
      throw new BadRequestException('Formato de email inválido');
    }
  
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: userData.email,
        telefone: userData.telefone,
        CPF: userData.CPF,
      },
    });
  
    if (userExists) {
      throw new NotFoundException('Usuário já existe');
    }
  
    if (userData.senha === userData.confirmarSenha) {
      const newUser = await this.prisma.user.create({
        data: {
          ...userData
        },
      });
  
      // Criação do registro na tabela hist_caronas
      const histCarona = await this.prisma.hist_caronas.create({
        data: {
          userId: newUser.id,
          caronasPegas: 0,
          caronasFornecidas: 0,
        },
      });
  
      this.verficacaoEmailService.create(newUser);
  
      return newUser;
    } else {
      throw new Error('Senha incorreta');
    }
  }

  async login(email: string, senha: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (user.senha !== senha) {
      throw new Error('Senha incorreta');
    }

    return user;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: number, userData: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('O usuário não existe!');
    }

    const updateUser = await this.prisma.user.update({
      data: {
        ...userData
      },
      where: {
        id,
      },
    });
    if (userData.senha === userData.confirmarSenha) {
      return updateUser;
    } else {
      throw new Error('Senha incorreta');
    }
  }

  async delete(id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('O usuário não existe!');
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
/*
const newCarona = await this.prisma.carona.create({
                data: {
                    end_origem: userDto.end_origem,
                    hr_saida: userDto.hr_saida,
                    hr_chegada: userDto.hr_chegada,
                    met_pagamento: userDto.met_pagamento,
                },
            });
 */
