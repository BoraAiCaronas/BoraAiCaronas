import { ApiProperty } from '@nestjs/swagger';

export class VerificacaoDTO {

  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({required: false})
  token_verificacao: string;

  @ApiProperty({ required: false})
  email_verificado: boolean;
}
