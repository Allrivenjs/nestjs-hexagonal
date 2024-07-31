import {
  IsString,
  IsInt,
  Min,
  IsNotEmpty,
  IsOptional,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsInt()
  productId: number;

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

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  transactionsIds: number[];
}
