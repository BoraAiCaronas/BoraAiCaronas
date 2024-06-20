import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { HistCaronasService } from './hist.service';

@Controller('hist-caronas')
@ApiTags('Histórico de Caronas')
export class HistCaronasController {
  constructor(private readonly histCaronasService: HistCaronasService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todas as caronas no histórico' })
  @ApiOkResponse({ description: 'Histórico de caronas obtido com sucesso' })
  findAll() {
    return this.histCaronasService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obter caronas no histórico por ID do usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiOkResponse({ description: 'Histórico de caronas obtido com sucesso' })
  findByUserId(@Param('userId') userId: number) {
    return this.histCaronasService.findByUserId(userId);
  }
}
