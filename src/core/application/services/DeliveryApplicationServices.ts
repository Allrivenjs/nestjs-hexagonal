import { Injectable } from '@nestjs/common';
import { DeliveryApplication } from '../DeliveryApplication';
import { DeliveryService } from '../../domain/ports/inbound/DeliveryService';
import { Delivery } from '../../domain/entities/Delivery';

@Injectable()
export class DeliveryApplicationServices implements DeliveryApplication {
  constructor(private delivery: DeliveryService) {}

  save(delivery: Delivery): Promise<Delivery> {
    return this.delivery.save(delivery);
  }

  findById(id: number): Promise<Delivery> {
    return this.delivery.findById(id);
  }
}
