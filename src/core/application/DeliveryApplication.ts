import { Delivery } from '../domain/entities/Delivery';

export interface DeliveryApplication {
  save(delivery: Delivery): Promise<Delivery>;
  findById(id: number): Promise<Delivery>;
}
