import { ApiProperty } from '@nestjs/swagger';

export class histDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  caronasPegas: number;

  @ApiProperty()
  caronasFornecidas: number;
}
