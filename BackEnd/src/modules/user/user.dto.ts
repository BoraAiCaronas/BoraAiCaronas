import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  id?: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  CPF: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;

  @ApiProperty()
  confirmarSenha: string;

  @ApiProperty()
  flagMotorista: string;
}
