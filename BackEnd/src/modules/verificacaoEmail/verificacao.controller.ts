import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiCreatedResponse,
    ApiOkResponse,
  } from '@nestjs/swagger';
  import { VerificacaoService } from './verificacao.service';
  
  @Controller('verificacao-email')
  @ApiTags('Verificação de email')
  export class VerificacaoController {
    constructor(private readonly verificacaoService: VerificacaoService) {}
  
    @Get(':id/:token')
    @ApiOperation({ summary: 'Confirmar verifição de email' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    @ApiCreatedResponse({ description: 'Confirmação do email foi validada com sucesso' })
    async confirmationVerification(@Param('id') idUser: string, @Param('token') verificacaoToken: String) {
      return this.verificacaoService.confirmationVerification(parseInt(idUser), verificacaoToken);
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Obter estado da verificação de email pelo Id' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    @ApiCreatedResponse({ description: 'Estado da verificação de email obtido com sucesso' })
    async verifyVerificacaoConcluida(@Param('id') idUser: string) {
      return this.verificacaoService.findByIdUser(parseInt(idUser));
    }

  }
  