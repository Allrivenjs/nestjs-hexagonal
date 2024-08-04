import { ApiProperty } from '@nestjs/swagger';

export class GenerateFakeRequest {
  @ApiProperty({
    name: 'count',
    description: 'Number of fake data to generate',
    type: Number,
    example: '10',
  })
  count: number;
}
