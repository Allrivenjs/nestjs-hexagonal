import { IsInt, Min, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { CardDto } from '../../../infraestructure/payment/wompi/dto/card.dto';
import { CreateCustomerDto } from './create-customer.dto';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(2000)
  amount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  numberUnits: number;

  @IsOptional()
  @IsInt()
  productId: number;

  @IsOptional()
  @IsInt()
  customer: CreateCustomerDto;

  @IsNotEmpty()
  card: CardDto;
}
