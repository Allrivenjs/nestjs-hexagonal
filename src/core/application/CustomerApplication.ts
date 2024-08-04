import { CreateCustomerDto } from '../shared/dto/create-customer.dto';
import { Customer } from '../domain/entities/Customer';

export interface CustomerApplication {
  createCustomer(newCustomer: CreateCustomerDto): Promise<number>;
  findById(customerId: number): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
}
