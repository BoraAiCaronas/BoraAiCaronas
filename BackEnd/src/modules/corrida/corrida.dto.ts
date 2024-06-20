import { ApiProperty } from '@nestjs/swagger';

export class CorridaDTO {

  @ApiProperty()
  IdCorrida: number;
  @ApiProperty()
  IdUserCorrida: number;
  @ApiProperty()
  idUserMotorista: number;
  @ApiProperty()
  latitudeUserOrigem: string;
  @ApiProperty()
  longitudeUserOrigem: string;
  @ApiProperty()
  latitudeUserDestino: string;
  @ApiProperty()
  longitudeUserDestino: string;
  @ApiProperty()
  enderco: string;
  @ApiProperty()
  hr_saida: string;
  @ApiProperty()
  hr_chegada: string;
}