import { Delivery } from '../../entities/Delivery';

export interface DeliveryService {
  save(delivery: Delivery): Promise<Delivery>;
  findById(id: number): Promise<Delivery>;
}
