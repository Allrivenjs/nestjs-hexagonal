import { CardRepository } from '../ports/outbound/CardRepository';
import { Card } from '../entities/Card';
import { CardDomainServices } from './CardDomainServices';

function CardRepositoryMock(): CardRepository {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(new Card())),
  };
}

describe('CardDomainServices', () => {
  let services: CardRepository = null;

  it('should call CardRepository.save()', async () => {
    const repositoryMock = CardRepositoryMock();
    services = new CardDomainServices(repositoryMock);
    await services.save({
      number: '4242424242424242',
      exp_month: '08',
      exp_year: '28',
      cvv: '123',
      card_holder: 'José Pérez',
      installments: 1,
    } as Card);
    expect(repositoryMock.save).toHaveBeenCalled();
  });
});
