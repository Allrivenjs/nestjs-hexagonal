import { CardService } from '../../domain/ports/inbound/CardService';
import { Card } from '../../domain/entities/Card';
import { CardApplicationServices } from './CardApplicationServices';

function CardServicesMock(): CardService {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(new Card())),
    findBy: jest.fn().mockReturnValue(Promise.resolve(new Card())),
  };
}

describe('CardApplicationService', () => {
  let service: CardService = null;

  it('should call CardService.save()', async () => {
    const cardMock = CardServicesMock();
    service = new CardApplicationServices(cardMock);

    const result = await service.save(new Card());
    expect(cardMock.save).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Card);
  });
});
