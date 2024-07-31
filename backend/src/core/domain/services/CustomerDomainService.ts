import { CustomerService } from '../ports/inbound/CustomerService';
import { CustomerRepository } from '../ports/outbound/CustomerRepository';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerDomainService implements CustomerService {
  constructor(private repository: CustomerRepository) {}
  findAll(): Promise<CustomerEntity[]> {
    return this.repository.findAll();
  }
  findById(id: number): Promise<CustomerEntity> {
    return this.repository.findById(id);
  }

  save(customer: CustomerEntity): Promise<CustomerEntity> {
    return this.repository.save(customer);
  }
}
