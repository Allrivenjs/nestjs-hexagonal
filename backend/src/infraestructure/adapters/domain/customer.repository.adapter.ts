import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../../core/domain/ports/outbound/CustomerRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../../postgress/entities/customer.entity';
import { Customer } from '../../../core/domain/entities/Customer';

@Injectable()
export class CustomerRepositoryAdapter implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
  ) {}

  findById(id: number): Promise<Customer> {
    return this.repository.findOneBy({ customerId: id });
  }

  async save(customer: Customer): Promise<Customer> {
    console.log('CustomerRepositoryAdapter.save', customer);
    return this.repository.save(customer);
  }
}
