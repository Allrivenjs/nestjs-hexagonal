import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequest {
  @ApiProperty({
    name: 'productName',
    description: 'Product name',
    type: String,
    example: 'Bike',
  })
  productName: string;

  @ApiProperty({
    name: 'productDescription',
    description: 'Product description',
    type: String,
    example:
      'Este es un excelente Luxurious Frozen Bike que cumple con todas tus expectativas.',
  })
  productDescription: string;

  @ApiProperty({
    name: 'unitPrice',
    description: 'Product price',
    type: Number,
    example: '100000',
  })
  unitPrice: number;

  @ApiProperty({
    name: 'unitsInStock',
    description: 'Product stock',
    type: Number,
    example: '100',
  })
  unitsInStock: number;

  @ApiProperty({
    name: 'imageUrl',
    description: 'Product image url',
    type: String,
    example:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MzkzODR8MHwxfHNlYXJjaHwxfHxMdXh1cmlvdXMlMjBGcm96ZW4lMjBCaWtlfGVufDB8fHx8MTcyMjU2MjE0M3ww&ixlib=rb-4.0.3&q=85',
  })
  imageUrl: string;
}
