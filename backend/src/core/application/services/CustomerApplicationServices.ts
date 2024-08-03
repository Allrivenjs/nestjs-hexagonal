import { Injectable } from '@nestjs/common';
import { CustomerApplication } from '../CustomerApplication';
import { CustomerService } from '../../domain/ports/inbound/CustomerService';
import { CreateCustomerDto } from '../../shared/dto/create-customer.dto';
import { Customer } from '../../domain/entities/Customer';

@Injectable()
export class CustomerApplicationServices implements CustomerApplication {
  constructor(private customer: CustomerService) {}

  async createCustomer(customer: CreateCustomerDto): Promise<number> {
    const entity = Customer.create(
      customer.name,
      customer.email,
      customer.phone,
      customer.address,
    );
    const saved = await this.customer.save(entity);
    return saved.customerId;
  }

  async findById(customerId: number): Promise<Customer> {
    return await this.customer.findById(customerId);
  }

  async findByEmail(email: string): Promise<Customer> {
    return await this.customer.findByEmail(email);
  }
}
