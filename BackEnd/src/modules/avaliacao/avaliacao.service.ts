import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AvaliacaoDTO } from './avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private prisma: PrismaService) {}

  async findAll(autorUserId: number): Promise<AvaliacaoDTO[]>{

    const autorUserIdInt = parseInt(autorUserId.toString(), 10);

    const avaliacoes = await this.prisma.avaliacao.findMany({
      where: {
        autorUserId: autorUserIdInt
      }
    })

    return avaliacoes
  }

  async findAllNotAvaliated(autorUserId: number): Promise<AvaliacaoDTO[]>{

    const autorUserIdInt = parseInt(autorUserId.toString(), 10);

    const avaliacoes = await this.prisma.avaliacao.findMany({
      where: {
        autorUserId: autorUserIdInt,
        status_avaliacao: "F"
      },
    })
    
    if (!avaliacoes){

      throw new NotFoundException("Nenhuma avaliação foi encontrada!")
    }

    return avaliacoes
  }

  async obterMediaAvaliacoesPorUsuario(avaliadoUserId: number): Promise<number> {

    const corridas = await this.prisma.corrida.findMany({
      where: {
          idUserMotorista: avaliadoUserId,
      },
      include: {
          avaliacao: true, 
      },
    });

    if (corridas.length === 0) {

      throw new Error('Nenhuma corrida encontrada para o usuário avaliado');
    }

    let totalAvaliacoes = 0;
    let somaAvaliacoes = 0;

    corridas.forEach(corrida => {
      corrida.avaliacao.forEach(avaliacao => {

        if (avaliacao.status_avaliacao = "T"){
          somaAvaliacoes += avaliacao.ST_avaliacao;
          totalAvaliacoes++;
        }
  
      });
    });

    if (totalAvaliacoes > 0) {

      const mediaAvaliacoes = somaAvaliacoes / totalAvaliacoes;

      return parseFloat(mediaAvaliacoes.toFixed(1)); // Arredonda para uma casa decimal

    } else {

      // Caso não haja avaliações, retorne um valor padrão ou uma mensagem indicando a ausência de avaliações.
      return 0; // Valor padrão (0) quando não há avaliações
      // ou
      // throw new NotFoundException('Nenhuma avaliação encontrada'); // Lança uma exceção informando que não há avaliações
    }
  }

  async processarAvaliacao(avaliacaoDTO: AvaliacaoDTO) {
    const { corridaId, autorUserId, ST_avaliacao, comentario_avaliacao} = avaliacaoDTO;

    try {
        
        const avaliacao = await this.prisma.avaliacao.findFirst({
            where: {
                autorUserId: autorUserId,
                corridaId: corridaId,
            },
        });

        if (!avaliacao) {

          throw new NotFoundException("Nenhuma avaliação foi encontrada!")
        }

        const newAvaliacao = await this.prisma.avaliacao.update({
            where: {
              id: avaliacao.id, 
            },
            data: {
                ST_avaliacao: ST_avaliacao,
                comentario_avaliacao: comentario_avaliacao,
                status_avaliacao: "T",
            },
        });

        return newAvaliacao;

      } catch (error) {
          
          throw new Error('Erro ao tentar processar avaliação');
      }
  }

  async createNew(avaliacaoDTO: AvaliacaoDTO) {

    const {corridaId, autorUserId, ST_avaliacao, comentario_avaliacao, status_avaliacao} = avaliacaoDTO

    try {

      const novaAvaliacao = await this.prisma.avaliacao.create({
        data: {
          autorUserId: parseInt(autorUserId.toString(), 10),
          corridaId: parseInt(corridaId.toString(), 10),
          ST_avaliacao: parseInt(ST_avaliacao.toString(), 10),
          comentario_avaliacao: comentario_avaliacao,
          status_avaliacao: status_avaliacao
        },
      });

      return novaAvaliacao;
    
    } catch (error) {
      
      throw new Error('Error ao tentar criar avaliação');
    }
  }
}
