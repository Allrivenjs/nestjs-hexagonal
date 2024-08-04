import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerDto } from '../../../core/shared/dto/create-customer.dto';
import { CardDto } from '../../payment/wompi/dto/card.dto';

export class CreateTransactionRequest {
  @ApiProperty({
    name: 'amount',
    description: 'Transaction amount',
    type: Number,
    example: '1000000',
    minimum: 1000000,
  })
  amount: number;

  @ApiProperty({
    name: 'productId',
    description: 'Product id',
    type: Number,
    example: '1',
  })
  productId: number;

  @ApiProperty({
    name: 'customer',
    description: 'Customer',
    type: CreateCustomerDto,
    example: {
      name: 'John Doe',
      email: 'test@gmail.com',
      phone: '3000000000',
      address: 'Calle 123',
    },
  })
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };

  @ApiProperty({
    description: 'Card',
    type: CardDto,
    example: {
      number: '4242424242424242',
      exp_month: '08',
      exp_year: '28',
      cvc: '123',
      card_holder: 'José Pérez',
      installments: 1,
    },
  })
  card: {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    card_holder: string;
    installments: number;
  };

  @ApiProperty({
    name: 'date',
    description: 'Transaction date',
    type: Date,
  })
  date: Date;

  @ApiProperty({
    name: 'numberUnits',
    description: 'Number of units',
    type: Number,
    example: '1',
  })
  numberUnits: number;
}
