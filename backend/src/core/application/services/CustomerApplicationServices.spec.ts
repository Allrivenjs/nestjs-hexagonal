import { CustomerService } from '../../domain/ports/inbound/CustomerService';
import { Customer } from '../../domain/entities/Customer';
import { CustomerApplicationServices } from './CustomerApplicationServices';
import { CustomerApplication } from '../CustomerApplication';

function CustomerServiceMock(customer_id: number): CustomerService {
  const customer = {
    customerId: customer_id,
    name: 'John Doe',
    address: '123 Main St',
    phone: '123-456-7890',
    email: 'test@gmail.com',
  } as Customer;
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
  };
}

describe('CustomerApplicationService', () => {
  let service: CustomerApplication = null;

  it('should call CustomerService.save()', async () => {
    const customerMock = CustomerServiceMock(1);
    service = new CustomerApplicationServices(customerMock);

    const result = await service.createCustomer({
      customerId: 1,
      name: 'John Doe',
      address: '123 Main St',
      phone: '123-456-7890',
      email: 'test@gmail.com',
    } as Customer);
    expect(customerMock.save).toHaveBeenCalled();
    expect(result).toBe(1);
  });

  it('should call CustomerService.findById()', async () => {
    const customerMock = CustomerServiceMock(1);
    service = new CustomerApplicationServices(customerMock);
    await service.findById(1);
    expect(customerMock.findById).toHaveBeenCalled();
  });
});
