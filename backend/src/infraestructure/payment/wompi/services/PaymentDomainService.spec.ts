import { PaymentRepository } from '../ports/outbound/PaymentRepository';
import { PaymentService } from '../ports/inbound/PaymentService';
import { PaymentDomainService } from './PaymentDomainService';
import { HttpService } from '@nestjs/axios';
import { CardDto } from '../dto/card.dto';
import { ConfigModule } from '@nestjs/config';
import { ChargeDto } from '../dto/charge.dto';
import { v4 as uuidv4 } from 'uuid';

function PaymentRepositoryMock(): PaymentRepository {
  return {
    checkTransaction: jest.fn().mockReturnValue(Promise.resolve({})),
    createTransaction: jest.fn().mockReturnValue(Promise.resolve({})),
  };
}
beforeAll(() => {
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  });
});

describe('PaymentDomainService', () => {
  let service: PaymentService = null;
  beforeAll(() => {
    const repositoryMock = PaymentRepositoryMock();
    service = new PaymentDomainService(repositoryMock, new HttpService());
  });

  it('should call tokenizedCard"', async () => {
    const card = CardDto.newCardDto({
      number: '4242424242424242',
      exp_month: '08',
      exp_year: '28',
      cvc: '123',
      card_holder: 'José Pérez',
    });
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
      cvc: '123',
      card_holder: 'José Pérez',
    });
    const token_data = await service.tokenizeCard(card);
    const charge = ChargeDto.newChargeDto({
      currency: 'COP',
      payment_method: {
        type: 'CARD',
        installments: 1,
        token: token_data.data.id,
      },
      amount_in_cents: 1000000,
      reference: uuidv4(),
    });

    const response = await service.createTransaction(charge);
    expect(response).toBeDefined();
  });

  it('should call checkTransaction"', async () => {
    // 15113-1722459727-47029
    const response = await service.checkTransaction('15113-1722459727-47029');
    expect(response).toBeDefined();
  });
});
