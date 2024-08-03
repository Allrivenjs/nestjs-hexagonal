import { Customer } from '../../entities/Customer';

export interface CustomerRepository {
  save(customer: Customer): Promise<Customer>;
  findById(id: number): Promise<Customer>;
}
