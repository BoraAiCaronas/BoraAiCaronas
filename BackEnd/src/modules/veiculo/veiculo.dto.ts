import { ApiProperty } from '@nestjs/swagger';

export class veiculoDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  nomeDoVeiculo: string;

  @ApiProperty()
  placa: string;

  @ApiProperty()
  DescVeiculo: string;
}
