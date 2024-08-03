import { PaymentService } from '../ports/inbound/PaymentService';
import { PaymentDomainService } from './PaymentDomainService';
import { HttpService } from '@nestjs/axios';
import { CardDto } from '../dto/card.dto';
import { ConfigModule } from '@nestjs/config';
import { Card } from '../../../../core/domain/entities/Card';

beforeAll(() => {
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  });
});

describe('PaymentDomainService', () => {
  let service: PaymentService = null;
  beforeAll(() => {
    service = new PaymentDomainService(new HttpService());
  });

  it('should call tokenizedCard"', async () => {
    const card = CardDto.newCardDto({
      number: '4242424242424242',
      exp_month: '08',
      exp_year: '28',
      cvv: '123',
      card_holder: 'José Pérez',
      installments: 1,
    } as Card);
    const response = await service.tokenizeCard(card);
    expect(response).toBeDefined();
  });

  it('should call AcceptToken"', async () => {
    const response = await service.AcceptToken();
    expect(response).toBeDefined();
  });

  it('should call createTransaction"', async () => {
    const card = CardDto.newCardDto({
      number: '4242424242424242',
      exp_month: '08',
      exp_year: '28',
      cvv: '123',
      card_holder: 'José Pérez',
      installments: 1,
    } as Card);
    const response = await service.createTransaction(card, 1000000);
    expect(response).toBeDefined();
  });

  it('should call checkTransaction"', async () => {
    // 15113-1722459727-47029
    const response = await service.checkTransaction('15113-1722459727-47029');
    console.log(response);
    expect(response).toBeDefined();
  });
});
