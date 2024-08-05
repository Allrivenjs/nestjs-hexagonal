import { Injectable } from '@nestjs/common';
import { DeliveryRepository } from '../../../core/domain/ports/outbound/DeliveryRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryEntity } from '../../postgress/entities/delivery.entity';
import { Repository } from 'typeorm';
import { Delivery } from '../../../core/domain/entities/Delivery';

@Injectable()
export class DeliveryRepositoryAdapter implements DeliveryRepository {
  constructor(
    @InjectRepository(DeliveryEntity)
    private repository: Repository<DeliveryEntity>,
  ) {}

  save(delivery: DeliveryEntity): Promise<DeliveryEntity> {
    return this.repository.save(delivery);
  }

  findById(id: number): Promise<Delivery> {
    return this.repository.findOne({
      where: {
        deliveryId: id,
      },
    });
  }
}
