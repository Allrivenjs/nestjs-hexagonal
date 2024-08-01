import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  unitPrice: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  unitsInStock: number;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}
