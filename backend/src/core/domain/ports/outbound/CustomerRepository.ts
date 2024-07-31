import { CustomerEntity } from '../../entities/customer.entity';

export interface CustomerRepository {
  findById(id: number): Promise<CustomerEntity>;
  findAll(): Promise<CustomerEntity[]>;
  save(customer: CustomerEntity): Promise<CustomerEntity>;
}
