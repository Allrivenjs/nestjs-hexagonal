import { DeliveryService } from '../../domain/ports/inbound/DeliveryService';
import { Delivery } from '../../domain/entities/Delivery';
import { DeliveryApplicationServices } from './DeliveryApplicationServices';

function DeliveryServicesMock(): DeliveryService {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(new Delivery())),
    findById: jest.fn().mockReturnValue(Promise.resolve(new Delivery())),
  };
}

describe('DeliveryApplicationService', () => {
  let service: DeliveryService = null;

  it('should call DeliveryService.save()', async () => {
    const deliveryMock = DeliveryServicesMock();
    service = new DeliveryApplicationServices(deliveryMock);

    const result = await service.save(new Delivery());
    expect(deliveryMock.save).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Delivery);
  });

  it('should call DeliveryService.findById()', async () => {
    const deliveryMock = DeliveryServicesMock();
    service = new DeliveryApplicationServices(deliveryMock);

    const result = await service.findById(1);
    expect(deliveryMock.findById).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Delivery);
  });
});
