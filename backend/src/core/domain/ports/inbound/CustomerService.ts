import { CustomerEntity } from '../../entities/customer.entity';

export interface CustomerService {
  findById(id: number): Promise<CustomerEntity>;
  findAll(): Promise<CustomerEntity[]>;
  save(customer: CustomerEntity): Promise<CustomerEntity>;
}
