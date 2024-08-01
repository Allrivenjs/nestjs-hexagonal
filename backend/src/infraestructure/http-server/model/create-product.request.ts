import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequest {
  @ApiProperty({
    description: 'Product name',
  })
  productName: string;

  @ApiProperty({
    description: 'Product description',
  })
  productDescription: string;

  @ApiProperty({
    description: 'Product price',
    type: Number,
    example: '10000',
  })
  unitPrice: number;

  @ApiProperty({
    description: 'Product stock',
    type: Number,
    example: '100',
  })
  unitsInStock: number;

  @ApiProperty({
    description: 'Product image url',
  })
  imageUrl: string;
}
