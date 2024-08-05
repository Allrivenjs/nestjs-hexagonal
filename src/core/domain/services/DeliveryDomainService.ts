import { DeliveryService } from '../ports/inbound/DeliveryService';
import { DeliveryRepository } from '../ports/outbound/DeliveryRepository';
import { Delivery } from '../entities/Delivery';

export class DeliveryDomainService implements DeliveryService {
  constructor(private repository: DeliveryRepository) {}

  async findById(id: number): Promise<Delivery> {
    return this.repository.findById(id);
  }

  async save(delivery: any): Promise<Delivery> {
    return this.repository.save(delivery);
  }
}
