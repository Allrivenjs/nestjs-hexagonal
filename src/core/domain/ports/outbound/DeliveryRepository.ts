import { Delivery } from '../../entities/Delivery';

export interface DeliveryRepository {
  save(delivery: Delivery): Promise<Delivery>;
  findById(id: number): Promise<Delivery>;
}
