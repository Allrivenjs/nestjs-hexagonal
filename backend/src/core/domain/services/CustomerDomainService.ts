import { CustomerService } from '../ports/inbound/CustomerService';
import { CustomerRepository } from '../ports/outbound/CustomerRepository';
import { Customer } from '../entities/Customer';

export class CustomerDomainService implements CustomerService {
  constructor(private repository: CustomerRepository) {}

  async findById(id: number): Promise<Customer> {
    return this.repository.findById(id);
  }

  async save(customer: Customer): Promise<Customer> {
    return this.repository.save(customer);
  }
}
