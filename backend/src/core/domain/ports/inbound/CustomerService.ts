import { Customer } from '../../entities/Customer';

export interface CustomerService {
  save(customer: Customer): Promise<Customer>;
  findById(id: number): Promise<Customer>;
}
