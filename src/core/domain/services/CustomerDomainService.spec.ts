import { CustomerRepository } from '../ports/outbound/CustomerRepository';
import { CustomerDomainService } from './CustomerDomainService';
import { Customer } from '../entities/Customer';

function CustomerRepositoryMock(): CustomerRepository {
  const customer = {
    customerId: 1,
  } as Customer;
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    save: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findByEmail: jest.fn().mockReturnValue(Promise.resolve(customer)),
  };
}

describe('CustomerDomainService', () => {
  let services: CustomerRepository = null;

  it('should call CustomerRepository.findById()', async () => {
    const repositoryMock = CustomerRepositoryMock();
    services = new CustomerDomainService(repositoryMock);
    await services.findById(1);
    expect(repositoryMock.findById).toHaveBeenCalled();
  });

  it('should call CustomerRepository.save()', async () => {
    const repositoryMock = CustomerRepositoryMock();
    services = new CustomerDomainService(repositoryMock);
    await services.save({
      name: 'Test',
      email: 'test@gmail.com',
      phone: '123456789',
    } as Customer);
    expect(repositoryMock.save).toHaveBeenCalled();
  });
});
