import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiParam,
  ApiOkResponse
} from '@nestjs/swagger';
import { CorridaService } from './corrida.service';
import { CorridaDTO } from './corrida.dto';

@Controller('corrida')
@ApiTags('Corrida')
export class CorridaController {
  constructor(private readonly corridaService: CorridaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova corrida' })
  @ApiCreatedResponse({ description: 'Corrida criada com sucesso' })
  async create(@Body() data: CorridaDTO) {
    return this.corridaService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as corridas' })
  @ApiCreatedResponse({ description: 'Corridas obtidas com sucesso' })
  async findAll() {
    return this.corridaService.findAll();
  }

  @Get('disponiveis')
  @ApiOperation({ summary: 'Obter corridas disponíveis' })
  @ApiCreatedResponse({ description: 'Corridas disponíveis obtidas com sucesso' })
  async findDisponiveis() {
    return this.corridaService.findDisponiveis();
  }

  @Post(':id/pegar/:motoristaId')
  @ApiOperation({ summary: 'Motorista pegar uma corrida' })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  @ApiParam({ name: 'motoristaId', description: 'ID do motorista' })
  @ApiCreatedResponse({ description: 'Corrida pega com sucesso' })
  async pegarCorrida(
    @Param('id') id: string,
    @Param('motoristaId') motoristaId: string
  ) {
    const corridaId = parseInt(id);
    const motoristaIdParsed = parseInt(motoristaId);

    return this.corridaService.pegarCorrida(corridaId, motoristaIdParsed);
  }

  @Post(':id/cancelar')
  @ApiOperation({ summary: 'Cancelar uma corrida' })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  @ApiCreatedResponse({ description: 'Corrida cancelada com sucesso' })
  async cancelarCorrida(
    @Param('id') id: string,
    @Body('userId') userId: string,
    @Body('isMotorista') isMotorista: boolean,
  ) {
    const corridaId = parseInt(id);
    const userIdParsed = parseInt(userId);

    return this.corridaService.cancelarCorrida(corridaId, userIdParsed, isMotorista);
  }

  @Post(':id/finalizar/:motoristaId')
  @ApiOperation({ summary: 'Finalizar uma corrida' })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  @ApiParam({ name: 'motoristaId', description: 'ID do motorista' })
  @ApiCreatedResponse({ description: 'Corrida finalizada com sucesso' })
  async finalizarCorrida(
    @Param('id') id: string,
    @Param('motoristaId') motoristaId: string
  ) {
    const corridaId = parseInt(id);
    const motoristaIdParsed = parseInt(motoristaId);

    return this.corridaService.finalizarCorrida(corridaId, motoristaIdParsed);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma corrida' })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  @ApiCreatedResponse({ description: 'Corrida excluída com sucesso' })
  async delete(@Param('id') id: string) {
    return this.corridaService.delete(parseInt(id));
  }

  @Get('finalizadas/passageiro/:idUserCorrida')
  @ApiOperation({ summary: 'Obter corridas finalizadas pelo passageiro' })
  @ApiParam({ name: 'idUserCorrida', description: 'ID do usuário passageiro' })
  @ApiOkResponse({ description: 'Corridas finalizadas obtidas com sucesso' })
  async getFinalizadasByPassageiro(
    @Param('idUserCorrida', ParseIntPipe) idUserCorrida: number
  ) {
    return await this.corridaService.findFinalizadasByPassageiro(idUserCorrida);
  }

  @Get('finalizadas/motorista/:idUserMotorista')
  @ApiOperation({ summary: 'Obter corridas finalizadas pelo motorista' })
  @ApiParam({ name: 'idUserMotorista', description: 'ID do motorista' })
  @ApiOkResponse({ description: 'Corridas finalizadas obtidas com sucesso' })
  async getFinalizadasByMotorista(
    @Param('idUserMotorista', ParseIntPipe) idUserMotorista: number
  ) {
    return await this.corridaService.findFinalizadasByMotorista(idUserMotorista);
  }
}
