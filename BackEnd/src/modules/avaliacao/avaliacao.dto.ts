import { ApiProperty } from '@nestjs/swagger';

export class AvaliacaoDTO {

  @ApiProperty()
  autorUserId: number;

  @ApiProperty()
  corridaId: number;

  @ApiProperty()
  ST_avaliacao: number;

  @ApiProperty()
  comentario_avaliacao: string;

  @ApiProperty()
  status_avaliacao: string = "F";
}
