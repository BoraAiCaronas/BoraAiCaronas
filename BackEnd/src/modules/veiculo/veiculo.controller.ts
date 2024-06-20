import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { VeiculoService } from './veiculo.service';
import { veiculoDTO } from './veiculo.dto';

@Controller('veiculo')
@ApiTags('Veículo')
export class veiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo veículo' })
  @ApiCreatedResponse({ description: 'Veículo criado com sucesso' })
  async create(@Body() veiculoDTO: veiculoDTO) {
    return this.veiculoService.create(veiculoDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um veículo' })
  @ApiParam({ name: 'id', description: 'ID do veículo' })
  @ApiCreatedResponse({ description: 'Veículo excluído com sucesso' })
  async delete(@Param('id') id: string) {
    return this.veiculoService.delete(parseInt(id));
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obter veículos por ID do usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiOkResponse({ description: 'Veículos obtidos com sucesso' })
  async findById(@Param('userId') userId: string) {
    return this.veiculoService.findByUserId(parseInt(userId));
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os veículos' })
  @ApiOkResponse({ description: 'Veículos obtidos com sucesso' })
  async findAll() {
    return this.veiculoService.findAll();
  }
}
