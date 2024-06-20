import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AvaliacaoDTO } from './avaliacao.dto';
import { AvaliacaoService } from './avaliacao.service';

@Controller('avaliacao')
@ApiTags('Avaliação')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  @ApiOperation({ summary: 'Processar uma nova avaliação' })
  @ApiCreatedResponse({ description: 'Avaliação processada com sucesso' })
  async processarAvaliacao(@Body() avaliacaoDTO: AvaliacaoDTO) {
    const novaAvaliacao = await this.avaliacaoService.processarAvaliacao(
      avaliacaoDTO,
    );
    return novaAvaliacao;
  }

  @Get(':autorUserId')
  @ApiOperation({ summary: 'Obter todas as avaliações do feitas pelo usuário' })
  @ApiParam({ name: 'autorUserId', description: 'ID do usuário avaliador' })
  @ApiCreatedResponse({ description: 'Avalicações obtidas com sucesso' })
  async findAll(@Param('autorUserId') autorUserId: number) {
    return this.avaliacaoService.findAll(autorUserId);
  }
  
  @Get('naoavaliadas/:autorUserId')
  @ApiOperation({ summary: 'Obter as avaliaçãos não concluidas pelo usuário' })
  @ApiParam({ name: 'autorUserId', description: 'ID do usuário avaliador' })
  @ApiCreatedResponse({ description: 'Avaliaçãos não concluidas pelo usuário obtidas com suscesso' })
  async findAllNotAvaliated(@Param('autorUserId') autorUserId: number) {
    return this.avaliacaoService.findAllNotAvaliated(autorUserId);
  }

  @Get('media/:avaliadoUserId')
  @ApiOperation({ summary: 'Obter a média de avaliações de um usuário' })
  @ApiParam({ name: 'avaliadoUserId', description: 'ID do usuário avaliado' })
  @ApiCreatedResponse({ description: 'Média de avaliações obtida com sucesso' })
  async obterMediaAvaliacoes(@Param('avaliadoUserId') avaliadoUserId: number) {
    const mediaAvaliacoes =
      await this.avaliacaoService.obterMediaAvaliacoesPorUsuario(avaliadoUserId);
    return { mediaAvaliacoes };
  }
}
