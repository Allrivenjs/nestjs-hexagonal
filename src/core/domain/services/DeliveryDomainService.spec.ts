import { DeliveryRepository } from '../ports/outbound/DeliveryRepository';
import { Delivery } from '../entities/Delivery';
import { DeliveryDomainService } from './DeliveryDomainService';

function DeliveryRepositoryMock(): DeliveryRepository {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(new Delivery())),
    findById: jest.fn().mockReturnValue(Promise.resolve(new Delivery())),
  };
}

describe('DeliveryDomainService', () => {
  let services: DeliveryRepository = null;

  it('should call DeliveryRepository.save()', async () => {
    const repositoryMock = DeliveryRepositoryMock();
    services = new DeliveryDomainService(repositoryMock);

    await services.save({
      address: 'Calle 123',
      city: 'Bogotá',
      state: 'Colombia',
      customerId: 1,
      status: 'pending',
      transactionId: 1,
      zipCode: '110221',
    } as Delivery);
    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it('should call DeliveryRepository.findById()', async () => {
    const repositoryMock = DeliveryRepositoryMock();
    services = new DeliveryDomainService(repositoryMock);

    await services.findById(1);
    expect(repositoryMock.findById).toHaveBeenCalled();
  });
});
