import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Usuário')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('cadastro')
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiCreatedResponse({ description: 'Usuário atualizado com sucesso' })
  async update(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userService.update(parseInt(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiCreatedResponse({ description: 'Usuário excluído com sucesso' })
  async delete(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }

  @Post('login')
  @ApiOperation({ summary: 'Fazer Login' })
  @ApiBody({
    description: 'Dados de login do usuário',
    type: 'object',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'Email do usuário' },
        senha: { type: 'string', description: 'Senha do usuário' },
      },
      required: ['email', 'senha'],
    },
  })
  @ApiCreatedResponse({ description: 'Login foi efetuado com sucesso' })
  async login(@Body() loginData: { email: string; senha: string }) {
    try {
      const user = await this.userService.login(
        loginData.email,
        loginData.senha,
      );
      return { message: 'Login successful', user };
    } catch (error) {
      return { message: 'Login failed', error: error.message };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter o usuário pelo Id' })
  @ApiOkResponse({ description: 'Usuário obtido com sucesso' })
  async findId(@Param('id') id: string) {
    return this.userService.findById(parseInt(id));
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiOkResponse({ description: 'Usuários obtidos com sucesso' })
  async findAll() {
    return this.userService.findAll();
  }
}
